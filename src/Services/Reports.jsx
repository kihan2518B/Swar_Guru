import React from 'react';
import Summary from '../Components/Summary';
import Chart from '../Components/Chart';

const Reports = ({ transcript }) => {
    return (
        <div>
            <h1>Summary</h1>
            <Summary transcript={transcript.text} />
            <h1>Visuals</h1>
            <div className="">

                <Chart
                    sentiment={transcript.sentiment_analysis_results}
                />
            </div>
        </div>
    );
};

export default Reports;
