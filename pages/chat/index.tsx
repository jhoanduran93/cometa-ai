import React, { useState, useEffect, useRef } from 'react';
import { MdAutoAwesome, MdEdit, MdPerson } from 'react-icons/md';
import Bg from '../../public/img/chat/bg-image.png';
import MessageBoxChat from '@/components/MessageBoxChat';
import { ChatBody } from '@/types/types';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Img,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const [outputCode, setOutputCode] = useState<string>('');

  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
  const inputColor = useColorModeValue('navy.700', 'white');
  const iconColor = useColorModeValue('brand.500', 'white');
  const bgIcon = useColorModeValue(
    'linear-gradient(180deg, #FBFBFF 0%, #CACAFF 100%)',
    'whiteAlpha.200',
  );
  const brandColor = useColorModeValue('brand.500', 'white');
  const buttonBg = useColorModeValue('white', 'whiteAlpha.100');
  const gray = useColorModeValue('gray.500', 'white');
  const buttonShadow = useColorModeValue(
    '14px 27px 45px rgba(112, 144, 176, 0.2)',
    'none',
  );
  const textColor = useColorModeValue('navy.700', 'white');
  const placeholderColor = useColorModeValue(
    { color: 'gray.500' },
    { color: 'whiteAlpha.600' },
  );

  useEffect(() => {
    const ws = new WebSocket('wss://cometa-c40d5067bfcf.herokuapp.com/chatbot');
    setWebsocket(ws);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const message = event.data;
      if (message.trim() !== '?') {
        if (message.startsWith('Cliente:')) {
          setMessages((prevMessages) => [
            ...prevMessages,
            `Tu pregunta es: ${message.slice(7)}`,
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            `\t ${message}`,
          ]);

          if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
          }
        }
      }
    };
    setInputMessage(' ');
    return () => {
      ws.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const question = `¿${inputMessage}?`;

    setMessages((prevMessages) => [
      ...prevMessages,
      `Tu pregunta es: ${question}`,
    ]);

    if (websocket && websocket.readyState === WebSocket.OPEN) {
      console.log(inputMessage);
      websocket.send(question);
      setInputMessage('');
    }
  };

  return (
    <Flex
      w="100%"
      pt={{ base: '70px', md: '0px' }}
      direction="column"
      position="relative"
    >
      <Img
        // src={Bg.src}
        position={'absolute'}
        w="350px"
        left="50%"
        top="50%"
        transform={'translate(-50%, -50%)'}
      />
      <Flex
        direction="column"
        mx="auto"
        w={{ base: '100%', md: '100%', xl: '100%' }}
        minH={{ base: '75vh', '2xl': '85vh' }}
        maxW="1000px"
       >
        <Flex
          direction={'column'}
          w="100%"
          mb={messages.length > 0 ? '20px' : 'auto'}
         >
          <Flex
            mx="auto"
            zIndex="2"
            w="max-content"
            mb="20px"
            borderRadius="60px"
          />
          {/* <Accordion color={gray} allowToggle w="100%" my="0px" mx="auto">
            <AccordionItem border="none">
              <AccordionButton
                borderBottom="0px solid"
                maxW="max-content"
                mx="auto"
                _hover={{ border: '0px solid', bg: 'none' }}
                _focus={{ border: '0px solid', bg: 'none' }}
              >
                <Box flex="1" textAlign="left">
                  <Text color={gray} fontWeight="500" fontSize="sm">
                    Encuentra temas relacionados con
                  </Text>
                </Box>
                <AccordionIcon color={gray} />
              </AccordionButton>
              <AccordionPanel mx="auto" w="max-content" p="0px 0px 10px 0px">
                <Text
                  color={gray}
                  fontWeight="500"
                  fontSize="sm"
                  textAlign={'center'}
                >
                  Recetas
                </Text>
                <Text
                  color={gray}
                  fontWeight="500"
                  fontSize="sm"
                  textAlign={'center'}
                >
                  Historia
                </Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion> */}
        </Flex>

        <Flex
          direction="column"
          w="100%"
          mx="auto"
          display={messages.length > 0 ? 'flex' : 'none'}
          mb={'auto'}
         >

      <Flex w="100%">
        <Flex direction="column" w="100%">
          {messages.map((message, index) => (
            <Flex
              key={index}
              style={{
                display: 'flex',
                alignSelf: message.startsWith('Tu pregunta es:') ? 'flex-end' : 'flex-start',
                justifyContent: message.startsWith('Tu pregunta es:') ? 'flex-end' : 'flex-start',
                textAlign: 'left',
                marginBottom: '20px',
                maxWidth: '70%',
              }}
            >
              {message.startsWith('\t') && (
                <Flex
                  borderRadius="full"
                  justify="center"
                  align="center"
                  bg={'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)'}
                  me="20px"
                  h="40px"
                  minH="40px"
                  minW="40px"
                >
                  <Icon as={MdAutoAwesome} width="20px" height="20px" color="white" />
                </Flex>
              )}
              <div
                style={{
                  backgroundColor: message.startsWith('Tu pregunta es:') ? '#4A25E1' : '#F2F2F2',
                  color: message.startsWith('Tu pregunta es:') ? 'white' : 'black',
                  borderRadius: '20px',
                  padding: '18px',
                }}
              >
                {message}
              </div>
            </Flex>
          ))}
        </Flex>
      </Flex>


        </Flex>

        <Flex ms={{ base: '0px', xl: '60px' }} mt="20px" justifySelf={'flex-end'}>
          <Input
            minH="54px"
            h="100%"
            border="1px solid"
            borderColor={borderColor}
            borderRadius="45px"
            p="15px 20px"
            me="10px"
            fontSize="sm"
            fontWeight="500"
            _focus={{ borderColor: 'none' }}
            color={inputColor}
            _placeholder={placeholderColor}
            placeholder="Escribe tu mensaje aquí..."
            // value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <Button
            variant="primary"
            py="20px"
            px="16px"
            fontSize="sm"
            borderRadius="45px"
            ms="auto"
            w={{ base: '160px', md: '210px' }}
            h="54px"
            _hover={{
              boxShadow: '0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important',
              bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important',
              _disabled: {
                bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
              },
            }}
            onClick={handleSendMessage}
          >
            Submit
          </Button>
        </Flex>

        <Flex justify="center" mt="20px" direction={{ base: 'column', md: 'row' }} alignItems="center">
          <Text fontSize="xs" textAlign="center" color={gray}>
            Cometa AI ChatBot puede producir información inexacta sobre personas, lugares o hechos.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default App;
