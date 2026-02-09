import {
  Center,
  Flex,
  HStack,
  Skeleton,
  SkeletonCircle,
  Stack
} from '@chakra-ui/react';

const skeletonProps = {
  startColor: '#f0f0f0',
  endColor: '#e4e4e7',
  speed: 1.2
};

export function TransactionEntrySkeleton() {
  return (
    <Flex p={{ base: '8px', lg: '16px' }} gap='0px' align='center'>
      <HStack gap='12px' flex='1'>
        <Center boxSize='40px' position='relative'>
          <SkeletonCircle {...skeletonProps} size='40px' />
        </Center>
        <Stack flex='1' gap='4px'>
          <Skeleton {...skeletonProps} height='16px' width='45%' />
          <Skeleton {...skeletonProps} height='14px' width='75%' />
        </Stack>
      </HStack>
      <Skeleton {...skeletonProps} height='16px' width='80px' />
    </Flex>
  );
}
