import { Skeleton, VStack } from '@chakra-ui/react';

const skeletonProps = {
  startColor: '#f0f0f0',
  endColor: '#e4e4e7',
  speed: 1.2
};

export function CommissionSidebarSkeleton() {
  return (
    <VStack p={{ base: '46px 38px' }} gap='6px' align='stretch'>
      <Skeleton {...skeletonProps} height='14px' width='180px' />
      <Skeleton {...skeletonProps} height='30px' width='140px' />
    </VStack>
  );
}
