// DrawerBox.jsx
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  VStack,
  Text,
  FormControl,
  FormLabel,
  Input,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

import { Recorder } from "react-voice-recorder";
import "react-voice-recorder/dist/index.css";

const DrawerBox = ({
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
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
  const cancelRef = useRef(); // Ref for cancel button in the dialog

  const handleRecordClick = () => {
    setIsRecordingLocal(true);
    setIsDialogOpen(true); // Open dialog when record button is clicked
    onRecordClick();
  };

  const handleStopRecording = () => {
    setIsRecordingLocal(false);
    hanldeReset();
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    if (isRecordingLocal) {
      handleStopRecording();
    }
  };

  const handleClearRecording = () => {
    handleStopRecording();
    // Optionally, you can add additional logic to reset state or handle file clearing
  };

  const handleUploadRecording = () => {
    handleAudioUpload(audioDetails.blob); // Call upload function with the audio file
    handleDialogClose(); // Close dialog after uploading
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
          bgGradient="linear(to-r, teal.500, blue.600)"
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
              bgGradient="linear(to-r, teal.500, blue.600)"
            >
              Upload
            </Button>
          </form>
        </VStack>

        {/* AlertDialog for recording confirmation and controls */}
        <AlertDialog
          isOpen={isDialogOpen}
          leastDestructiveRef={cancelRef}
          onClose={handleDialogClose}
          isCentered
          size="md"
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Audio Recording
              </AlertDialogHeader>

              <AlertDialogBody>
                {isRecordingLocal && (
                  <Box>
                    <Recorder
                      record={true}
                      audioURL={audioDetails.url}
                      handleAudioStop={handleAudioStop}
                      handleAudioUpload={handleAudioUpload}
                      handleReset={handleStopRecording}
                    />
                  </Box>
                )}
                {!isRecordingLocal && (
                  <Text>Click Record Audio to start recording.</Text>
                )}
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  colorScheme="teal"
                  onClick={handleUploadRecording}
                  disabled={!audioDetails.blob} // Disable if no audio is recorded
                  bgGradient="linear(to-r, teal.500, blue.600)"
                >
                  Upload
                </Button>

                <Button ref={cancelRef} onClick={handleDialogClose} ml={3}>
                  Close
                </Button>
                {!isRecordingLocal && (
                  <Button
                    colorScheme="green"
                    onClick={handleRecordClick}
                    ml={3}
                  >
                    Record
                  </Button>
                )}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Flex>
    </Box>
  );
};

export default DrawerBox;
