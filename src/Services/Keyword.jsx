import React from 'react';
import Entity from '../Components/Entity';
import Topic from './Topic';
import { Box, Heading, VStack } from '@chakra-ui/react';

const Keyword = ({ transcript }) => {
    return (
        <Box p={4} maxW="1200px" mx="auto">
            <Heading size="lg" mb={4}>Keywords Detected</Heading>

            <VStack spacing={4} align="start">
                {transcript.sentiment_analysis_results.map((result, index) => (
                    <Entity
                        key={index}
                        text={result.text}
                        sentiment={result.sentiment}
                        entities={transcript.entities}
                    />
                ))}
            </VStack>

            <Topic transcript={transcript} />
        </Box>
    );
};

export default Keyword;
