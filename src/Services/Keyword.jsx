// eslint-disable-next-line no-unused-vars
import React from "react";
import Entity from "../Components/Entity";
import { Box, VStack } from "@chakra-ui/react";
import Topic from "../Services/Topic"
const Keyword = ({ transcript }) => {
    const uniqueEntities = Array.from(
        new Set(transcript.entities.map((entity) => entity.text))
    );

    return (
        <Box p={4} maxW="1200px" mx="auto">
            <VStack spacing={4} align="start">
                <Topic transcript={transcript} />
                {uniqueEntities.map((entity, index) => (
                    <Entity
                        key={index}
                        text={entity}
                        sentiment={
                            transcript.sentiment_analysis_results.find((result) =>
                                result.text.includes(entity)
                            )?.sentiment
                        }
                        entityType={
                            transcript.entities.find((e) => e.text === entity)?.entity_type
                        }
                    />
                ))}
            </VStack>
        </Box>
    );
};

export default Keyword;
