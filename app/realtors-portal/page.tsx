'use client';

import { Center } from '@chakra-ui/react';
import {
  AuthVerificationPage,
  LibraryProvider
} from '@raelmartins/realtors-portal';

export default function AuthenticateRealtor() {
  return (
    <LibraryProvider>
      <Center minH={`100vh`} w={`100%`} bg={`#ffffff`}>
        <AuthVerificationPage />
      </Center>
    </LibraryProvider>
  );
}
