// const {  } = require("@google/generative-ai");
import { GoogleGenerativeAI } from "@google/generative-ai"

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyD8JbyFInYCDszVGDEfAnNDEjCc2ZViXr8");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//Call of Ai
async function run(prompt) {

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text
}


//Function to generate quiz
export const GenerateSummary = async (transcription) => {
    // const paragraphs = transcription.split('\n\n');
    // console.log("transcription:", transcription);
    // for (const paragraph of paragraphs) {
    const prompt = ` ${transcription} Make a summary of the transcript given to you in about 100-150 words`;
    const response = await run(prompt); // Assuming a function to call Gemini API
    // }

    if (response) console.log("Got response");

    return response;
};