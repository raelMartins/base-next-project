import { Box, Text, VStack } from '@chakra-ui/react';
import { IoCheckmarkCircle } from 'react-icons/io5';

export const RealtorApplicationSuccess = () => {
  return (
    <Box
      maxW="440px"
      w={{ base: '100%', lg: '440px' }}
      bg="#f5f5f5"
      px={{ base: '24px', md: '40px' }}
      py="32px"
      borderRadius={5}
      boxShadow={
        '0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)'
      }
    >
      <VStack spacing={4} align="center" py={4}>
        <IoCheckmarkCircle size={64} color="#22c55e" />
        <Text fontSize="20px" fontWeight={600} color="#000000" textAlign="center">
          Success, Realtor Application request sent
        </Text>
        <Text color="#5b5b5b" fontSize="14px" textAlign="center" lineHeight="140%">
          Your application has been submitted. We will review it and get back to
          you shortly.
        </Text>
      </VStack>
    </Box>
  );
};
