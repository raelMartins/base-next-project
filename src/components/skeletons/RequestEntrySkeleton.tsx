import {
  Center,
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

export function RequestEntrySkeleton() {
  return (
    <HStack p={{ base: '8px', lg: '16px' }} gap='12px'>
      <Center boxSize='40px' position='relative'>
        <SkeletonCircle {...skeletonProps} size='40px' />
      </Center>
      <Stack flex='1' gap='4px'>
        <Skeleton {...skeletonProps} height='16px' width='90%' />
        <Skeleton {...skeletonProps} height='14px' width='40%' />
      </Stack>
    </HStack>
  );
}
