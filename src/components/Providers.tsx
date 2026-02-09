'use client';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StateContextProvider } from '@/providers/StateContext';
import { libraryTheme } from '@/utils/theme';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 } }
});

const theme = extendTheme(libraryTheme);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <StateContextProvider accessToken=''>
          {children}
        </StateContextProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
