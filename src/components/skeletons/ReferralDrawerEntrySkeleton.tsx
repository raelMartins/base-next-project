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

export function ReferralDrawerEntrySkeleton() {
  return (
    <HStack gap='12px' flex='1'>
      <Center boxSize='48px' position='relative'>
        <SkeletonCircle {...skeletonProps} size='48px' />
      </Center>
      <Stack flex='1' gap='4px'>
        <Skeleton {...skeletonProps} height='16px' width='60%' />
        <Skeleton {...skeletonProps} height='14px' width='85%' />
      </Stack>
    </HStack>
  );
}
