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

export function SettlementAccountEntrySkeleton() {
  return (
    <HStack cursor='pointer' gap='9px' p='15px 24px'>
      <Center>
        <SkeletonCircle {...skeletonProps} size='40px' />
      </Center>
      <Stack p='10px' flex='1'>
        <Skeleton {...skeletonProps} height='16px' width='70%' />
        <Skeleton {...skeletonProps} height='14px' width='50%' mt='4px' />
      </Stack>
    </HStack>
  );
}
