/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  VStack,
  Text,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Recorder } from "react-voice-recorder";
import "react-voice-recorder/dist/index.css";

const DrawerBox = ({
  onUploadClick,
  onRecordClick,
  audioDetails,
  handleAudioStop,
  handleAudioUpload,
  hanldeReset,
  handleFileChange,
  handleDirectUpload,
  isRecording,
  isLoading,
  file,
}) => {
  const [isRecordingLocal, setIsRecordingLocal] = useState(isRecording);

  const handleRecordClick = () => {
    setIsRecordingLocal(true);
    onRecordClick();
  };

  const handleStopRecording = () => {
    setIsRecordingLocal(false);
    hanldeReset();
  };

  const handleChooseFileClick = () => {
    document.getElementById("file-upload-input").click();
  };

  return (
    <Box
      as="nav"
      w="250px"
      h="100vh"
      position="fixed"
      top="0"
      left="0"
      p="4"
      zIndex="sticky"
      bg="gray.100"
      borderRight="1px"
      borderColor="gray.200"
    >
      <Flex direction="column" h="full">
        <Text
          as="h1"
          fontSize="2xl"
          mb="8"
          bgGradient="linear(to-r, blue.600, orange.600)"
          bgClip="text"
          fontWeight="bold"
          textAlign="center"
          pb="2"
        >
          Swar Guru
        </Text>
        <VStack spacing="4" align="start">
          <Button
            w="full"
            variant="outline"
            colorScheme="linear(to-r, blue.600, orange.600)"
            onClick={handleRecordClick}
          >
            Record Audio
          </Button>
          <form onSubmit={handleDirectUpload}>
            <FormControl id="audio-file" isRequired>
              <FormLabel>Select an audio file to upload</FormLabel>

              {/* Hidden file input */}
              <Input
                id="file-upload-input"
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                display="none" // Hide the input
              />

              {/* Styled Choose File button */}
              <Button
                w="full"
                variant="outline"
                colorScheme="linear(to-r, blue.600, orange.600)"
                onClick={handleChooseFileClick}
              >
                Choose File
              </Button>
            </FormControl>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isLoading}
              type="submit"
              isDisabled={!file} // Disable upload button if no file is selected
            >
              Upload
            </Button>
          </form>
        </VStack>
        {isRecordingLocal && (
          <Box mt={4}>
            <Recorder
              record={true}
              audioURL={audioDetails.url}
              handleAudioStop={handleAudioStop}
              handleAudioUpload={handleAudioUpload}
              handleReset={handleStopRecording}
            />
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default DrawerBox;
