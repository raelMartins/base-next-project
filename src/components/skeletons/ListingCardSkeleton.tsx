import {
  Box,
  HStack,
  Skeleton,
  VStack
} from '@chakra-ui/react';

const skeletonProps = {
  startColor: '#f0f0f0',
  endColor: '#e4e4e7',
  speed: 1.2
};

export function ListingCardSkeleton() {
  return (
    <Box
      width='100%'
      bg='white'
      border='1px solid'
      borderColor='#E4E4E7'
      rounded='12px'
      overflow='hidden'
    >
      <HStack
        width='100%'
        gap='0'
        flexDirection={{ xl: 'row', base: 'column' }}
      >
        <Skeleton
          {...skeletonProps}
          width='100%'
          maxWidth={{ xl: '220px', base: 'none' }}
          minHeight='200px'
          flex='1'
        />
        <VStack
          align='flex-start'
          justify='space-between'
          width='100%'
          gap={{ md: '20px', base: '0' }}
          flex='1'
          p={{ xl: '18px 16px 18px 24px', md: '16px 16px 24px', base: '16px 16px 24px' }}
        >
          <VStack width='100%' align='flex-start' gap='24px'>
            <Box width='100%' display='grid' gridTemplateColumns='1fr auto' gap='8px'>
              <Skeleton {...skeletonProps} height='28px' width='70%' />
              <Skeleton {...skeletonProps} height='28px' width='100px' />
              <Skeleton {...skeletonProps} height='14px' width='60%' />
              <Skeleton {...skeletonProps} height='14px' width='80px' />
            </Box>
            <HStack gap='8px' display={{ md: 'flex', base: 'none' }} flexWrap='wrap'>
              <Skeleton {...skeletonProps} height='24px' width='80px' rounded='4px' />
              <Skeleton {...skeletonProps} height='24px' width='70px' rounded='4px' />
              <Skeleton {...skeletonProps} height='24px' width='90px' rounded='4px' />
              <Skeleton {...skeletonProps} height='24px' width='60px' rounded='4px' />
            </HStack>
          </VStack>
          <HStack width='100%' gap='6px'>
            <Skeleton {...skeletonProps} height='28px' width='140px' rounded='4px' />
            <Skeleton {...skeletonProps} height='28px' width='60px' rounded='4px' />
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
}
