// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

import { ChakraProvider, Box, VStack, Grid, theme } from "@chakra-ui/react";

import Result from "./Services/Results";

import "react-voice-recorder/dist/index.css";

import "./App.css";

import DrawerBox from "./Components/DrawerBox";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Status from "./Services/Status";
import SentimentalAnalysis from "./Services/SentimentalAnalysis";
import Keyword from "./Services/Keyword";
import Reports from "./Services/Reports";

function App() {
  const initialState = {
    url: null,

    blob: null,

    chunks: null,

    duration: {
      h: 0,

      m: 0,

      s: 0,
    },
  };

  const [audioDetails, setAudioDetails] = useState(initialState);

  const [transcript, setTranscript] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [file, setFile] = useState(null);

  const [isRecording, setIsRecording] = useState(false);

  const ASSEMBLY_API_KEY = "c1db9f2624cf4cbdae6f61f0e6ee20d6";

  const handleAudioStop = (data) => {
    setAudioDetails(data);
  };

  const hanldeReset = () => {
    setAudioDetails({ ...initialState });

    setTranscript("");
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDirectUpload = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);

      const uploadResponse = await fetch(
        "https://api.assemblyai.com/v2/upload",

        {
          method: "POST",

          headers: {
            authorization: ASSEMBLY_API_KEY,
          },

          body: formData,
        }
      );

      const uploadData = await uploadResponse.json();

      await getTranscription(uploadData.upload_url);
    } catch (error) {
      console.error("Error during direct file upload:", error);

      setTranscript("Error occurred during file upload.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecordedAudioUpload = async (audioFile) => {
    setIsLoading(true);

    try {
      const uploadResponse = await fetch(
        "https://api.assemblyai.com/v2/upload",

        {
          method: "POST",

          headers: {
            authorization: ASSEMBLY_API_KEY,
          },

          body: audioFile,
        }
      );

      const uploadData = await uploadResponse.json();

      await getTranscription(uploadData.upload_url);
    } catch (error) {
      console.error("Error during recorded audio upload:", error);

      setTranscript("Error occurred during audio upload.");
    } finally {
      setIsLoading(false);
    }
  };

  const getTranscription = async (audioUrl) => {
    try {
      const transcriptResponse = await fetch(
        "https://api.assemblyai.com/v2/transcript",

        {
          method: "POST",

          headers: {
            authorization: ASSEMBLY_API_KEY,

            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            audio_url: audioUrl,
            sentiment_analysis: true,

            entity_detection: true,

            iab_categories: true,
          }),
        }
      );

      const transcriptData = await transcriptResponse.json();

      const transcriptId = transcriptData.id;

      let isCompleted = false;

      while (!isCompleted) {
        const statusResponse = await fetch(
          `https://api.assemblyai.com/v2/transcript/${transcriptId}`,

          {
            method: "GET",

            headers: {
              authorization: ASSEMBLY_API_KEY,
            },
          }
        );

        const statusData = await statusResponse.json();
        if (statusData.status === "completed") {
          setTranscript(statusData);

          isCompleted = true;
        } else if (statusData.status === "failed") {
          setTranscript("Transcription failed.");

          isCompleted = true;
        } else {
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      }
    } catch (error) {
      console.error("Error fetching transcript:", error);

      setTranscript("Error occurred during transcription.");
    }
  };

  const handleUploadClick = () => {
    document.getElementById("file-upload-input").click();
  };

  const handleRecordClick = () => {
    setIsRecording(true);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <DrawerBox
          onUploadClick={handleUploadClick}
          onRecordClick={handleRecordClick}
          audioDetails={audioDetails}
          handleAudioStop={handleAudioStop}
          handleAudioUpload={handleRecordedAudioUpload}
          hanldeReset={hanldeReset}
          handleFileChange={handleFileChange}
          handleDirectUpload={handleDirectUpload}
          isRecording={isRecording}
          isLoading={isLoading}
          file={file}
        />

        <Grid minH="100vh" p={3} ml={250} pl={5}>
          <VStack spacing={8}>
            <Box width={1000}>
              {transcript.text && transcript.status === "completed" ? (
                <></>
              ) : (
                <Status isLoading={isLoading} status={transcript.status} />
              )}

              <Tabs isFitted variant="enclosed">
                <TabList mb="1em">
                  <Tab>Transcription Engine</Tab>
                  <Tab>Keyword Extraction</Tab>

                  <Tab>Sentiment Analysis</Tab>

                  <Tab>Reporting and Visualization</Tab>
                </TabList>

                <TabPanels
                  bgGradient="linear(to-r, teal.500, blue.600)"
                  bgClip="text"
                >
                  <TabPanel>
                    {transcript.text && transcript.status === "completed" ? (
                      <Result transcript={transcript} />
                    ) : (
                      <></>
                    )}
                  </TabPanel>
                  <TabPanel>
                    {transcript.text && transcript.status === "completed" ? (
                      <Keyword transcript={transcript} />
                    ) : (
                      <></>
                    )}
                  </TabPanel>

                  <TabPanel>
                    {transcript.text && transcript.status === "completed" ? (
                      <SentimentalAnalysis transcript={transcript} />
                    ) : (
                      <></>
                    )}
                  </TabPanel>

                  <TabPanel>
                    {transcript.text && transcript.status === "completed" ? (
                      <Reports transcript={transcript} />
                    ) : (
                      <></>)}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
