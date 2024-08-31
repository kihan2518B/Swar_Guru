import React from 'react'
import Summary from '../Components/Summary'

const Reports = ({ transcript }) => {
    console.log(transcript)
    return (
        <div>
            <h1>Summary</h1>
            <Summary transcript={transcript.text} />
        </div>
    )
}

export default Reports
