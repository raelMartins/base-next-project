'use client';

import { Center } from '@chakra-ui/react';
import { BaseLogin, LibraryProvider } from '@raelmartins/realtors-portal';

export default function Home() {
  return (
    <LibraryProvider>
      <Center minH={`100vh`} w={`100%`} bg={`#ffffff`}>
        <BaseLogin />
      </Center>
    </LibraryProvider>
  );
}
