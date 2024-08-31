import React from "react";
import Summary from "../Components/Summary";
import Chart from "../Components/Chart";

import { Heading } from "@chakra-ui/react";

const Reports = ({ transcript }) => {
    return (
        <div>
            <Heading
                size="md"
                bgGradient="linear(to-r, teal.500, blue.600)"
                bgClip="text"
                textAlign={"left"}
                m={3}
            >
                Summary:
            </Heading>
            <Summary transcript={transcript.text} />
            <Heading
                size="md"
                bgGradient="linear(to-r, teal.500, blue.600)"
                bgClip="text"
                textAlign={"left"}
                m={3}
            >
                Visual:
            </Heading>
            <div className="">
                <Chart sentiment={transcript.sentiment_analysis_results} />
            </div>
        </div>
    );
};

export default Reports;
