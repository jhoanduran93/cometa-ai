/*eslint-disable*/

import {
  Flex,
  Button,
  Text,
  useColorModeValue,
  Icon,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import Card from '@/components/card/Card';
import { FcIdea } from 'react-icons/fc';
import React from 'react';

export default function Home() {

  const textColor = useColorModeValue('navy.700', 'white');
  const placeholderColor = useColorModeValue(
    { color: 'gray.500' },
    { color: 'whiteAlpha.600' },
  );
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');

    const items = [
    "¿Qué?: Para detalles y descripciones. Ejemplo: ¿Qué servicios ofrecen?", 
    "¿Cómo?: Para instrucciones y procedimientos. Ejemplo: ¿Cómo configurar mi cuenta?",
    "¿Cuándo?: Para horarios y fechas. Ejemplo: '¿Cuándo es la reunión?'", 
    "¿Dónde?: Para ubicaciones. Ejemplo: ¿Dónde está la tienda más cercana?",
    "¿Quién?: Para identificar personas o entidades. Ejemplo: ¿Quién es el CEO?",
    "¿Cuánto?: Para cantidades. Ejemplo: ¿Cuánto cuesta el envío?",
    "¿Cuál?: Para hacer elecciones entre opciones. Ejemplo: ¿Cuál plan es el mejor?",
    "¿Por_qué?: Para motivaciones y razones. Ejemplo: ¿Por qué recomiendan este producto?",
    "¿Para_quién?: Para público objetivo. Ejemplo: ¿Para quién es la oferta?",
    "¿Con_quién?: Para identificar con quién contactar. Ejemplo: ¿Con quién hablar sobre soporte?",


  ];
  

  return (
    <Flex
      w="100%"
      direction="column"
      position="relative"
      mt={{ base: '70px', md: '0px', xl: '0px' }}
    >
      <Flex
        mx="auto"
        w={{ base: '100%', md: '100%', xl: '100%' }}
        maxW="100%"
        justify="center"
        direction={{ base: 'column', md: 'row' }}
      >
        <Card maxW="100%" h="100%">
          <Text fontSize={'30px'} color={textColor} fontWeight="800" mb="10px">
          Algunos tips!
          <Icon as={FcIdea} w="20px" h="20px" me="10px" />
          </Text>
          <Text fontSize={'16px'} color="gray.500" fontWeight="500" mb="30px">
          Formular preguntas de manera precisa es clave para obtener respuestas de calidad en Cometa.
          </Text>

          <Text fontSize={'16px'} color="gray.500" fontWeight="500" mb="30px">
          Aquí tienes algunos consejos:
          </Text>

          <UnorderedList>
          {items.map((item, index) => (
         <ListItem key={index} style={{ marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold'}}>{item.split(' ')[0]}</span> {/* Palabra en negrita */}
          {item.split(' ').slice(1).join(' ')} {/* Resto de la palabra */}
         </ListItem>
         ))}
          </UnorderedList>

          <Button
            as="a"
            href="/chat"
            variant="primary"
            border="1px solid"
            borderColor={borderColor}
            borderRadius="full"
            maxW="160px"
            ms="auto"
            mt={5}
            fontSize="md"
            w={{ base: '300px', md: '420px' }}
            h="54px"
            _hover={{
              boxShadow: '0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important',
              bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important',
              _disabled: {
                bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
              },
            }}
          >
            Ir al ChatBot!
          </Button>
  
        </Card>
      </Flex>
    </Flex>
  );
}
