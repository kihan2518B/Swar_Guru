// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Box, Text, Tooltip } from '@chakra-ui/react';

const SentimentColors = {
    POSITIVE: 'lightgreen',
    NEGATIVE: 'pink',
    NEUTRAL: 'lightgray'
};

const Highlighted = ({ text, sentiment, entities }) => {
    // For Example
    // text = "Ted Conference was great" --> parts = ["Ted Conference", "was great"]

    const entityText = entities.map((e) => e.text);

    // Dividing all text in all possible entities 
    const parts = text.split(new RegExp(`(${entityText.join("|")})`, 'g'));

    return (
        <Box as='mark' bg={SentimentColors[sentiment]} mr="1">
            {parts.map((part, index) => {  // Added 'index' for unique key
                const matchingEntity = entities.find((e) => e.text === part);

                if (matchingEntity) {
                    return (
                        <Tooltip
                            label={matchingEntity.entity_type}
                            key={index}  // Using 'index' as a unique key
                        >
                            <Text display="inline" fontSize="xl" fontWeight="bold">{part}</Text>
                        </Tooltip>
                    )
                }

                return <Text key={index} display="inline">{part}</Text>;  // Added 'Text' component with key for non-entity parts
            })}
        </Box>
    );
};

export default Highlighted;
