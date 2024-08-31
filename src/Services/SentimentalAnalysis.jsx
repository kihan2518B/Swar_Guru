import React from 'react';
import { Box, VStack, Text, List, ListItem, Divider } from '@chakra-ui/react';

const SentimentalAnalysis = ({ transcript }) => {
    const SentimentColors = {
        POSITIVE: 'green.100',
        NEGATIVE: 'red.100',
        NEUTRAL: 'gray.100'
    };

    // Categorize sentiments
    const categorizedSentiments = {
        POSITIVE: [],
        NEUTRAL: [],
        NEGATIVE: []
    };

    transcript.sentiment_analysis_results.forEach((result) => {
        categorizedSentiments[result.sentiment].push(result.text);
    });

    return (
        <VStack spacing={6} align="stretch">
            {Object.keys(categorizedSentiments).map((sentiment) => (
                <Box
                    key={sentiment}
                    p={5}
                    bg={SentimentColors[sentiment]}
                    borderWidth="1px"
                    borderRadius="lg"
                    boxShadow="md"
                    width="100%"
                >
                    <Text fontSize="lg" fontWeight="bold" mb={4}>
                        {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
                    </Text>
                    {categorizedSentiments[sentiment].length > 0 ? (
                        <List spacing={3}>
                            {categorizedSentiments[sentiment].map((text, index) => (
                                <ListItem key={index} display="flex" alignItems="center">
                                    <Box
                                        as='mark'
                                        bg={SentimentColors[sentiment]}
                                        borderRadius="md"
                                        p={2}
                                        flex="1"
                                        textAlign={"left"}
                                    >
                                        <Box>
                                            <Text>{text}</Text>
                                        </Box>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Text>No {sentiment.toLowerCase()} sentiments found.</Text>
                    )}
                </Box>
            ))}
        </VStack>
    );
};

export default SentimentalAnalysis;
