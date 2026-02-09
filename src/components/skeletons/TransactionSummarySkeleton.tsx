import {
  HStack,
  Skeleton,
  SkeletonCircle,
  Stack,
  VStack
} from '@chakra-ui/react';

const skeletonProps = {
  startColor: '#f0f0f0',
  endColor: '#e4e4e7',
  speed: 1.2
};

export function TransactionSummarySkeleton() {
  return (
    <VStack align='stretch' w='100%' gap='32px' py='24px'>
      <Stack gap='24px' borderBottom='1px solid' borderColor='#e4e4e7'>
        <HStack gap='12px' p='24px' pt='0px'>
          <SkeletonCircle {...skeletonProps} size='60px' />
          <Stack gap='6px' flex='1'>
            <Skeleton {...skeletonProps} height='20px' width='70%' />
            <Skeleton {...skeletonProps} height='14px' width='50%' />
          </Stack>
        </HStack>
        <HStack p='24px' gap='16px' flexWrap='wrap'>
          {[1, 2, 3, 4].map((i) => (
            <VStack key={i} align='stretch' flex='1' minW='120px' gap='6px'>
              <Skeleton {...skeletonProps} height='14px' width='90px' />
              <Skeleton {...skeletonProps} height='18px' width='100px' />
            </VStack>
          ))}
        </HStack>
      </Stack>
      <Stack gap='16px'>
        <Skeleton {...skeletonProps} height='20px' width='180px' mx='24px' />
        <VStack align='stretch' gap='0px'>
          {[1, 2, 3].map((i) => (
            <TransactionEntryRowSkeleton key={i} />
          ))}
        </VStack>
      </Stack>
    </VStack>
  );
}

function TransactionEntryRowSkeleton() {
  return (
    <HStack p='16px' gap='12px'>
      <SkeletonCircle size='40px' {...skeletonProps} />
      <Stack flex='1' gap='4px'>
        <Skeleton {...skeletonProps} height='16px' width='60%' />
        <Skeleton {...skeletonProps} height='14px' width='40%' />
      </Stack>
      <Skeleton {...skeletonProps} height='16px' width='80px' />
    </HStack>
  );
}
