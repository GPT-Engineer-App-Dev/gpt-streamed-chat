import { useState, useEffect } from "react";
import { Box, Button, Input, VStack, Text, useToast } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const toast = useToast();

  // Simulate streaming responses from GPT-3.5
  const handleSendMessage = () => {
    if (!inputText.trim()) {
      toast({
        title: "Message is empty",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const newMessage = { id: messages.length + 1, text: inputText, sender: "user" };
    setMessages([...messages, newMessage]);

    // Simulate GPT-3.5 response
    setTimeout(() => {
      const botResponse = { id: messages.length + 2, text: `Echo: ${inputText}`, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1500);

    setInputText("");
  };

  return (
    <VStack spacing={4} p={5}>
      <Box w="100%" p={4} borderWidth="1px" borderRadius="lg" overflowY="auto" h="400px">
        {messages.map((message) => (
          <Text key={message.id} alignSelf={message.sender === "user" ? "flex-end" : "flex-start"} bg={message.sender === "user" ? "blue.100" : "green.100"} p={2} borderRadius="md">
            {message.text}
          </Text>
        ))}
      </Box>
      <Input placeholder="Type your message here..." value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} />
      <Button rightIcon={<FaPaperPlane />} colorScheme="blue" onClick={handleSendMessage}>
        Send
      </Button>
    </VStack>
  );
};

export default Index;
