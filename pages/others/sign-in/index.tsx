'use client';

// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Link,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import illustration from '/public/img/auth/auth2.jpg';
import { HSeparator } from '@/components/separator/Separator';
import DefaultAuth from '@/components/auth';
//import React from 'react';
import { FcBusinessman } from 'react-icons/fc';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import NavLink from '@/components/link/NavLink';
import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import APIModal from '@/components/apiModal';


function SignUp() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.500';
  const textColorDetails = useColorModeValue('navy.700', 'gray.500');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
  const placeholderColor = useColorModeValue(
    { color: 'gray.500', fontWeight: '500' },
    { color: 'whiteAlpha.600', fontWeight: '500' },
  );
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const router = useRouter();
  let redirectToChat = false;


  const loginUser = async () => {
    try {
      console.log('Antes de la solicitud');
      const response = await axios.post('https://cometa-c40d5067bfcf.herokuapp.com/login', {
        email: email,
        password: password,
        keepLoggedIn: keepLoggedIn,
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
        setLoginError("Correo o contraseña incorrectos"); // Establece el mensaje de error
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
        setLoginError("Error al iniciar sesión"); // Establece el mensaje de error
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
    if (!email) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  
    if (!password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  
    // Realizar la acción de inicio de sesión solo si no hay errores
    if (!emailError && !passwordError) {
      // Aquí puedes realizar la acción de inicio de sesión
      await loginUser();
    }
  };

  // const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <DefaultAuth illustrationBackground={illustration?.src}>
      <Flex
        w="100%"
        maxW="max-content"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="100%"
        justifyContent="center-left"
        mb={{ base: '30px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '12vh' }}
        flexDirection="column"
      >
        <Box me="auto">
          <Text
            color={textColor}
            fontSize={{ base: '34px', lg: '36px' }}
            mb="10px"
            fontWeight={'700'}
          >
            Sign In
          </Text>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="500"
            fontSize="sm"
          >
            Enter your email and password to sign in!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: '100%', md: '420px' }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: 'auto', lg: 'unset' }}
          me="auto"
          mb={{ base: '20px', md: 'auto' }}
        >
          <Button
            variant="transparent"
            border="1px solid"
            borderColor={borderColor}
            borderRadius="14px"
            ms="auto"
            mb="30px"
            fontSize="md"
            w={{ base: '100%' }}
            h="54px"
            onClick={() => setIsModalOpen(true)}
          >
            <Icon as={FcBusinessman} w="20px" h="20px" me="10px" />
            Sign in as a guest
          </Button>

          {/* Renderiza el modal si isModalOpen es verdadero */}
          {isModalOpen && <APIModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}


          <Flex align="center" mb="25px">
            <HSeparator />
            <Text
              color={textColorSecondary}
              fontWeight="500"
              fontSize="sm"
              mx="14px"
            >
              or
            </Text>
            <HSeparator />
          </Flex>
          {loginError && (
  <Text color="red.500" fontSize="sm" mb="16px">
    {loginError}
  </Text>
)}
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
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              id="email"
              variant="auth"
              fontSize="sm"
              type="email"
              placeholder="Enter your email address"
              mb="24px"
              size="lg"
              // borderColor={borderColor}
              borderColor={emailError ? "red" : borderColor}
              h="54px"
              fontWeight="500"
              _placeholder={{ placeholderColor }}
              onChange={handleEmailChange}
            />
            {/* PASSWORD */}
            <FormLabel
              cursor="pointer"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              htmlFor="password"
              color={textColor}
              display="flex"
            >
              Password<Text color={brandStars}>*</Text>
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
            <Flex justifyContent="space-between" align="center" mb="24px">
              <FormControl display="flex" alignItems="center">
                <Checkbox
                  id="remember-login"
                  colorScheme="brandScheme"
                  me="10px"
                  onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  color={textColor}
                  fontWeight="600"
                  fontSize="sm"
                >
                  Keep me logged in
                </FormLabel>
              </FormControl>
              <NavLink href="#">
                <Text
                  color={textColorBrand}
                  w="124px"
                  fontWeight="600"
                  fontSize="sm"
                >
                  Forgot password?
                </Text>
              </NavLink>
            </Flex>
            {/* CONFIRM */}
            <Button
              onClick={handleLogin}
              variant="primary"
              py="20px"
              px="16px"
              fontSize="sm"
              borderRadius="45px"
              mt={{ base: '20px', md: '0px' }}
              w="100%"
              h="54px"
              mb="24px"
            >
              Sign In
            </Button>

          </FormControl>
          <Flex justifyContent="center" alignItems="start" maxW="100%" mt="0px">
            <Text color={textColorDetails} fontWeight="500" fontSize="sm">
              Not registered yet?
            </Text>
            <Link href="/others/register" py="0px" lineHeight={'120%'}>
              <Text
                color={textColorBrand}
                fontSize="sm"
                as="span"
                ms="5px"
                fontWeight="600"
              >
                Create an Account
              </Text>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignUp;
