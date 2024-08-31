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
                size="sm"
                width={500}
                isIndeterminate={isLoading}
                colorScheme='green'
            />
        </div>
    )
}

export default Status
