import { Text } from '@chakra-ui/layout'
import React, { useEffect, useState } from 'react'
import { GenerateSummary } from '../helper/Symmary'

const Summary = ({ transcript }) => {

    const [summary, setSummary] = useState(null);
    useEffect(() => {
        async function GetSummary() {
            const response = await GenerateSummary(transcript);
            console.log("response", response);
            setSummary(response)
        }
        GetSummary();
    }, [transcript])
    return (
        <div>
            <Text>
                {summary == null ? (
                    <>Loading...</>
                ) : (
                    <>{summary}</>
                )}
            </Text>
        </div>
    )
}

export default Summary
