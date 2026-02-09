import {
  Box,
  Center,
  HStack,
  Skeleton,
  Stack,
  VStack
} from '@chakra-ui/react';

const skeletonProps = {
  startColor: '#f0f0f0',
  endColor: '#e4e4e7',
  speed: 1.2
};

export function ReferralPageContentSkeleton() {
  return (
    <Stack w='100%' gap='40px' py='40px' pr={{ base: '20px', md: '95px' }}>
      {/* Portfolio section */}
      <Box
        width='100%'
        border='1px solid'
        borderColor='#E4E4E7'
        borderRadius='12px'
        overflow='hidden'
      >
        <HStack padding='16px 24px' gap='8px'>
          <Skeleton {...skeletonProps} height='24px' width='24px' rounded='4px' />
          <Skeleton {...skeletonProps} height='16px' width='80px' />
        </HStack>
        <Stack padding='20px 24px 32px' gap='18px'>
          <Skeleton {...skeletonProps} height='24px' width='60%' />
          <HStack gap='12px' flexWrap='wrap'>
            <Skeleton {...skeletonProps} height='14px' width='120px' />
            <Skeleton {...skeletonProps} height='14px' width='80px' />
            <Skeleton {...skeletonProps} height='14px' width='100px' />
          </HStack>
          <Skeleton {...skeletonProps} height='14px' width='40%' mt='10px' />
        </Stack>
      </Box>

      {/* Inspection section */}
      <Box
        width='100%'
        border='1px solid'
        borderColor='#E4E4E7'
        borderRadius='12px'
        overflow='hidden'
      >
        <HStack padding='16px 24px' gap='8px'>
          <Skeleton {...skeletonProps} height='24px' width='24px' rounded='4px' />
          <Skeleton {...skeletonProps} height='16px' width='100px' />
        </HStack>
        <VStack padding='24px' gap='16px' align='stretch'>
          {[1, 2, 3].map((i) => (
            <HStack key={i} gap='16px'>
              <Skeleton {...skeletonProps} height='60px' width='60px' rounded='8px' />
              <Stack flex='1' gap='4px'>
                <Skeleton {...skeletonProps} height='16px' width='70%' />
                <Skeleton {...skeletonProps} height='14px' width='50%' />
              </Stack>
            </HStack>
          ))}
        </VStack>
      </Box>

      {/* Additional info blocks */}
      <VStack align='stretch' gap='24px'>
        {[1, 2].map((i) => (
          <Box key={i}>
            <Skeleton {...skeletonProps} height='16px' width='120px' mb='12px' />
            <Skeleton {...skeletonProps} height='80px' width='100%' rounded='8px' />
          </Box>
        ))}
      </VStack>
    </Stack>
  );
}
