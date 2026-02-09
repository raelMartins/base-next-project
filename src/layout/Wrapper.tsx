import { Box, Flex, Stack, useDisclosure } from '@chakra-ui/react';
import { Navbar } from './Navbar';
import { ReactNode } from 'react';
import { Footer } from './Footer';

export const LayoutWrapper = ({
  sidebarMenuStyle = 'expandable',
  children
}: {
  sidebarMenuStyle?: 'expandable' | 'drawer';
  children: ReactNode;
}) => {
  return (
    <Stack minH="100vh" gap={0} overflowX="hidden">
      <Navbar />
      <Box flex={1} minH={0} w="100%" overflowX="hidden">
        {children}
      </Box>
      <Footer />
    </Stack>
  );
};
