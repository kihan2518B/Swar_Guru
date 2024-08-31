// eslint-disable-next-line no-unused-vars
import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Flex,
  Avatar,
  Divider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button
} from '@chakra-ui/react';

import Vinit from './../Images/Vinit.jpg';
import Mohak from './../Images/Mohak.jpg';
import Nilax from './../Images/nilax.jpg';
import Krish from './../Images/Krish.jpg';
import Kishan from './../Images/Kishan.jpg';




const teamMembers = [
  { name: 'Mohak Shah', role: 'Backend / Researcher', email: 'kent@company.com', bio: 'Kent is experienced in both front-end and back-end development.', image: Mohak },
  { name: 'Nilax Modi', role: 'Frontend / Researcher', email: 'kent@company.com', bio: 'Kent is experienced in both front-end and back-end development.', image: Nilax},
  { name: 'Kishan Meghani', role: 'Full-Stack Developer', email: 'ryan@company.com', bio: 'Ryan ensures our products meet user needs and business goals.', image: Kishan },
  { name: 'Krish Patel', role: 'Frontend', email: 'prosper@company.com', bio: 'Prosper optimizes our deployment and infrastructure.', image: Krish },
  { name: 'Vinit Chaudhary', role: 'Ineffective', email: 'christian@company.com', image: Vinit },
];

const AboutAndContact = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        bgImage="url('https://via.placeholder.com/1600x400')"
        bgSize="cover"
        bgPosition="center"
        color="white"
        py={20}
        textAlign="center"
      >
        <Container maxW="container.md">
          <VStack spacing={4}>
            <Heading as="h1" size="3xl">
              About Us
            </Heading>
            <Text fontSize="xl">
              Learn more about our team and how you can get in touch with us.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* About Us Section */}
      <Container maxW="container.md" py={12}>
        <VStack spacing={8} align="stretch">
          <Text fontSize="lg" lineHeight="tall" textAlign="center">
            We are a team of passionate individuals committed to delivering the best products and services. Our mission is to innovate and provide value to our customers through dedication and excellence.
          </Text>
          
          <Divider />
          
          <Heading as="h2" size="xl" textAlign="center">
            Meet the Team
          </Heading>

          <Flex wrap="wrap" justify="center" spacing={4}>
            {teamMembers.map((member) => (
              <Popover key={member.name}>
                <PopoverTrigger>
                  <Avatar
                    name={member.name}
                    src={member.image || 'https://via.placeholder.com/150'}
                    size='xl'
                    cursor='pointer'
                    m={2}
                  />
                </PopoverTrigger>
                <PopoverContent width="300px" p={4}>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader fontWeight="bold">
                    {member.name}
                  </PopoverHeader>
                  <PopoverBody>
                    <Text fontWeight="bold">{member.role}</Text>
                    <Text>{member.bio}</Text>
                    <Text mt={2} fontSize="sm" color="gray.500">
                      Email: {member.email}
                    </Text>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            ))}
          </Flex>
        </VStack>
      </Container>

      {/* Contact Us Section */}
      <Box bg='gray.50' py={12}>
        <Container maxW="container.md">
          <VStack spacing={8} align="stretch">
            <Heading as="h2" size="xl" textAlign="center">
              Contact Us
            </Heading>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input type="text" placeholder="Your Name" />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Your Email" />
            </FormControl>
            <FormControl id="message">
              <FormLabel>Message</FormLabel>
              <Textarea placeholder="Your Message" />
            </FormControl>
            <Button colorScheme="teal" size="lg" alignSelf="center">
              Send Message
            </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutAndContact;