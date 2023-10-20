'use client';
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Icon,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';

interface APIModalProps {
  isOpen: boolean; // Especifica el tipo de isOpen
  onClose: () => void;
}

function APIModal({ isOpen, onClose }: APIModalProps) {
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.500';
  // const textColorDetails = useColorModeValue('navy.700', 'gray.500');
  // const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
  const placeholderColor = useColorModeValue(
    { color: 'gray.500', fontWeight: '500' },
    { color: 'whiteAlpha.600', fontWeight: '500' },
  );
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState("");

  const router = useRouter();
  let redirectToChat = false;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const loginUser = async () => {
    try {
      console.log('Antes de la solicitud');
      const response = await axios.post('https://cometa-c40d5067bfcf.herokuapp.com/login', {
        email: email,
        password: password,
      });
  
      console.log('Después de la solicitud, antes de verificar el código de estado');
      // Verificar el código de estado de la respuesta
      if (response.status === 200) {
        redirectToChat = true;
        // El inicio de sesión fue exitoso
        console.log('Inicio de sesión exitoso:', response.data);
      } else {
        // El servidor respondió, pero no fue un inicio de sesión exitoso
        console.error('Error en el inicio de sesión:', response.data);
       
      }
    } catch (error: any) {
      // Manejar errores de la API
      if (axios.isAxiosError(error)) {
        // El servidor respondió con un código de estado diferente de 2xx
        console.error('Error en el inicio de sesión:', error.response?.data);
        setLoginError("Correo o contraseña incorrectos"); // Establece el mensaje de error
      } else {
        // Ocurrió un error antes de recibir una respuesta del servidor
        console.error('Error al iniciar sesión:', error.message);
        
      }
    } finally {
      if (redirectToChat) {
        console.log("Antes de redirección");
        router.push('/chat');
      }
    }
  };

  const handleLogin = async () => {
    // Validaciones adicionales si es necesario
      await loginUser();
  };

  const handleClick = () => setShow(!show);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign In as a Guest</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel
              cursor="pointer"
              display="flex"
              ms="4px"
              htmlFor="email"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Email<Text color={brandStars}></Text>
            </FormLabel>
            <Input
              // isRequired={true}
              id="email"
              variant="auth"
              fontSize="sm"
              type="email"
              placeholder="Enter your email address"
              mb="24px"
              size="lg"
              borderColor={borderColor}
              h="54px"
              fontWeight="500"
              _placeholder={{ color: placeholderColor }}
              onChange={handleEmailChange}
              value={email}
            />

            <FormLabel
              cursor="pointer"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              htmlFor="password"
              color={textColor}
              display="flex"
            >
              Password<Text color={brandStars}></Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                variant="auth"
                id="password"
                fontSize="sm"
                placeholder="Enter your password"
                mb="24px"
                size="lg"
                borderColor={passwordError ? "red" : borderColor}
                h="54px"
                fontWeight="500"
                _placeholder={{ placeholderColor }}
                type={show ? 'text' : 'password'}
                onChange={handlePasswordChange}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: 'pointer' }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={handleLogin}
            variant="primary"
            py="20px"
            px="16px"
            fontSize="sm"
            borderRadius="45px"
            w="100%"
            h="54px"
            mb="24px"
          >
            Sign In
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default APIModal;
