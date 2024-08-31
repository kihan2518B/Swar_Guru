import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const SentimentColors = {
    POSITIVE: 'green',
    NEGATIVE: 'red',
    NEUTRAL: 'gray'
};

const Chart = ({ sentiment }) => {
    console.log("sentiment", sentiment);
    useEffect(() => {
        // Initialize chart
        const chartDom = document.getElementById('sentiment-chart');
        const myChart = echarts.init(chartDom);

        // Calculate percentages for each sentiment
        const total = sentiment.length;
        const positiveCount = sentiment.filter(s => s.sentiment === 'POSITIVE').length;
        const neutralCount = sentiment.filter(s => s.sentiment === 'NEUTRAL').length;
        const negativeCount = sentiment.filter(s => s.sentiment === 'NEGATIVE').length;

        const gaugeData = [
            {
                value: ((positiveCount / total) * 100).toFixed(2),  // Two decimal points
                name: 'Positive',
                itemStyle: {
                    color: SentimentColors.POSITIVE
                },
                title: {
                    offsetCenter: ['0%', '-40%']  // Increase spacing above the value
                },
                detail: {
                    valueAnimation: true,
                    offsetCenter: ['0%', '-25%'],  // Adjust position for more spacing
                    formatter: '{value}%'  // Two decimal places already handled above
                }
            },
            {
                value: ((neutralCount / total) * 100).toFixed(2),  // Two decimal points
                name: 'Neutral',
                itemStyle: {
                    color: SentimentColors.NEUTRAL
                },
                title: {
                    offsetCenter: ['0%', '0%']  // Centered title
                },
                detail: {
                    valueAnimation: true,
                    offsetCenter: ['0%', '15%'],  // Adjust position for more spacing
                    formatter: '{value}%'  // Two decimal places already handled above
                }
            },
            {
                value: ((negativeCount / total) * 100).toFixed(2),  // Two decimal points
                name: 'Negative',
                itemStyle: {
                    color: SentimentColors.NEGATIVE
                },
                title: {
                    offsetCenter: ['0%', '40%']  // Increase spacing above the value
                },
                detail: {
                    valueAnimation: true,
                    offsetCenter: ['0%', '55%'],  // Adjust position for more spacing
                    formatter: '{value}%'  // Two decimal places already handled above
                }
            }
        ];

        const option = {
            series: [
                {
                    type: 'gauge',
                    startAngle: 90,
                    endAngle: -270,
                    pointer: {
                        show: false
                    },
                    progress: {
                        show: true,
                        overlap: false,
                        roundCap: true,
                        clip: false,
                        itemStyle: {
                            borderWidth: 1,
                            borderColor: '#464646'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            width: 40
                        }
                    },
                    splitLine: {
                        show: false,
                        distance: 0,
                        length: 10
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false,
                        distance: 50
                    },
                    data: gaugeData,
                    title: {
                        fontSize: 14
                    },
                    detail: {
                        width: 50,
                        height: 14,
                        fontSize: 14,
                        color: 'inherit',
                        borderColor: 'inherit',
                        borderRadius: 20,
                        borderWidth: 1,
                        formatter: '{value}%'  // Formatter for percentages
                    }
                }
            ]
        };

        myChart.setOption(option);

        // Cleanup on component unmount
        return () => {
            myChart.dispose();
        };
    }, [sentiment]);

    return (
        <div id="sentiment-chart" style={{ width: '100%', height: '400px' }}></div>
    );
};

export default Chart;
