import {
  Box,
  List,
  ListItem,
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

export function ProfileSidebarSkeleton() {
  return (
    <Box
      flex='1'
      maxWidth={{ md: '284px', base: 'none' }}
      width={{ md: 'auto', base: 'none' }}
      pt={{ md: '56px', base: '34px' }}
      pb={{ md: '40px', base: '24px' }}
      display='flex'
      flexDirection='column'
      gap={{ md: '34px', base: '24px' }}
    >
      <VStack
        width='100%'
        align='flex-start'
        gap='40px'
        pr={{ md: '14px', base: '0' }}
      >
        <VStack
          width='100%'
          align={{ md: 'flex-start', base: 'center' }}
          gap='12px'
        >
          <SkeletonCircle {...skeletonProps} size='100px' />
          <VStack
            align={{ md: 'flex-start', base: 'center' }}
            gap='8px'
            width='100%'
          >
            <Skeleton {...skeletonProps} height='24px' width='180px' />
            <Skeleton {...skeletonProps} height='14px' width='120px' />
          </VStack>
        </VStack>
        <List
          display='grid'
          gridTemplateColumns={{ md: '1fr', base: 'repeat(2, 1fr)' }}
          flexDirection='column'
          gap={{ md: '16px', base: '24px' }}
          px={{ md: '0', base: '24px' }}
          width='100%'
        >
          {[1, 2, 3].map((i) => (
            <ListItem key={i} display='flex' flexDirection='column' gap='4px'>
              <Skeleton {...skeletonProps} height='14px' width='100px' />
              <Skeleton {...skeletonProps} height='18px' width='100%' />
            </ListItem>
          ))}
        </List>
      </VStack>
      <VStack
        width='100%'
        pr={{ md: '14px', base: '24px' }}
        pl={{ md: '0', base: '24px' }}
        align='flex-start'
        pt={{ md: '28px', base: '20px' }}
        borderTop='1px solid'
        borderColor='#E4E4E7'
        gap={{ md: '28px', base: '24px' }}
      >
        <Skeleton {...skeletonProps} height='21px' width='180px' />
        <Stack gap='16px' width='fit-content'>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              {...skeletonProps}
              height='32px'
              width={`${120 + i * 40}px`}
              rounded='full'
            />
          ))}
        </Stack>
      </VStack>
    </Box>
  );
}
