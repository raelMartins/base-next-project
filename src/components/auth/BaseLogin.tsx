import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  Link,
  Stack,
  Text,
  useToast
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { store_name } from '@/constants/routes';
import { realtorLogin } from '@/api/auth';
import { AgentRegistrationForm } from './AgentRegistrationForm';
import { RealtorApplicationSuccess } from './RealtorApplicationSuccess';

type View = 'login' | 'register' | 'success';

export const BaseLogin = () => {
  const [email, setEmail] = useState('');
  const [view, setView] = useState<View>('login');
  const storeName = store_name();
  const toast = useToast();

  const handleSubmit = () => {
    mutate({ email, store_name: storeName });
  };

  const { mutate, isPending } = useMutation(
    (formData: { email: string; store_name: string }) => realtorLogin(formData),
    {
      onSuccess: (res: any) => {
        const action = res?.data?.action ?? res?.response?.data?.action;
        if (action === 'signup' || action === 'not_customer') {
          setView('register');
        } else if (action === 'login') {
          toast({
            status: 'success',
            title: 'Success',
            description: 'Logged In Successfully'
          });
          if (res?.data?.link) {
            location.assign(`?${res?.data?.link?.split(`?`)?.[1]}`);
          }
        } else {
          toast({
            status: 'error',
            title: 'Error',
            description: 'There was a problem authenticating this email'
          });
        }
      },
      onError: (err: any) => {
        const action = err?.response?.data?.action;
        if (action === 'signup' || action === 'not_customer') {
          setView('register');
        } else {
          toast({
            status: 'error',
            title: 'Error',
            description:
              err?.response?.data?.message ??
              'There was a problem authenticating this email'
          });
        }
      }
    }
  );

  if (view === 'success') {
    return (
      <Flex w="100%" justify="center" align="center">
        <RealtorApplicationSuccess />
      </Flex>
    );
  }

  if (view === 'register') {
    return (
      <Flex w="100%" justify="center" align="center" direction="column">
        <Box w="100%" maxW="640px">
          <Link
            fontSize="14px"
            color="#5b5b5b"
            mb={3}
            display="inline-block"
            onClick={() => setView('login')}
            _hover={{ textDecoration: 'underline' }}
            cursor="pointer"
          >
            ← Back to login
          </Link>
          <AgentRegistrationForm
            email={email}
            onSuccess={() => setView('success')}
          />
        </Box>
      </Flex>
    );
  }

  return (
    <Box
      maxW='440px'
      w={{ base: `100%`, lg: `440px` }}
      bg='#f5f5f5'
      px={{ base: `24px`, md: '40px' }}
      py='32px'
      borderRadius={5}
      boxShadow={
        '0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)'
      }
    >
      <Flex h='full' direction='column' justify={'center'} align='center'>
        <Text fontSize={'23px'} fontWeight={600} color='#000000'>
          Login
        </Text>
        <Stack
          w={`100%`}
          gap={{ base: `24px`, md: `16px` }}
          mt={`8px`}
          textAlign={`center`}
          align={`center`}
        >
          <Text
            color='#5b5b5b'
            fontSize={{ base: '13px', lg: '16px' }}
            lineHeight={`140%`}
          >
            Enter realtor email address.
          </Text>
          <Input
            type='email'
            name='email'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder='Email Address'
            _placeholder={{ fontSize: '13px' }}
            fontSize='16px'
            padding={{ base: `12px 14px`, md: '14px 15px' }}
            height='100%'
            lineHeight='140%'
          />

          <Button
            w={`100%`}
            borderRadius={`full`}
            bg={`#000`}
            color={`#fff`}
            fontSize={`12px`}
            lineHeight={`150%`}
            textTransform={`capitalize`}
            fontWeight={`400`}
            onClick={handleSubmit}
            isLoading={isPending}
            p={`8px`}
          >
            Proceed
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
};
