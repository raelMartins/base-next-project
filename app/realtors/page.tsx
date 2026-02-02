'use client';

import { Center } from '@chakra-ui/react';
import { AuthVerificationPage } from '@veerge/realtors-portal';

export default function AuthenticateRealtor() {
  return (
    <Center minH={`100vh`} w={`100%`} bg={`#ffffff`}>
      <AuthVerificationPage />
    </Center>
  );
}
