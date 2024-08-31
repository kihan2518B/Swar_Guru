// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Box, Heading, Tag } from '@chakra-ui/react'

const Topic = ({ transcript }) => {
    // splitting through > and popping it to get the last one
    // MedicalHealth>DiseasesAndConditions>Injuries>FirstAid 
    return (
        <div>
            <Heading size="md">Topics Detected: </Heading>
            <Box p="3">
                {Object.keys(transcript.iab_categories_result.summary)
                    .filter(
                        topic => transcript.iab_categories_result.summary[topic] > 0.6
                    )
                    .map((topic, index) => (
                        <Tag
                            key={index}
                            size="md"
                            variant="outline"
                            borderRadius="full"
                            bgGradient="linear(to-r, teal.500, blue.600)"
                            bgClip="text"
                        >
                            {topic.split('>').pop()}
                        </Tag>
                    ))}
            </Box>
        </div>
    )
}

export default Topic
