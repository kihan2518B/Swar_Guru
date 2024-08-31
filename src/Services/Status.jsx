// eslint-disable-next-line no-unused-vars
import React from 'react'

import { Text, Progress } from '@chakra-ui/react'

const Status = ({ isLoading, status }) => {

    return (
        <div>
            <Text>
                {
                    isLoading ? `Calculating... ${status || 'uploading'}...` : 'Give me audio!'
                }
            </Text>

            <Progress
                size="xs"
                m={2}
                width="full"
                isIndeterminate={isLoading}
                // colorScheme='green'
                   bgGradient="linear(to-r, teal.500, blue.600)"
                bgClip="text"
            />
        </div>
    )
}

export default Status
