import {
  Box,
  Skeleton,
  SkeletonCircle,
  Stack,
  VStack
} from '@chakra-ui/react';
import { NAVBAR_HEIGHT } from '@/layout/Navbar';
import { FOOTER_HEIGHT } from '@/layout/Footer';

const skeletonProps = {
  startColor: '#f0f0f0',
  endColor: '#e4e4e7',
  speed: 1.2
};

export function ReferralProfileSidebarSkeleton() {
  return (
    <Stack
      w='400px'
      minW='400px'
      borderRight='1px solid'
      borderColor='#E4E4E7'
      p={{ base: '55px 50px' }}
      py='0px'
      height={`calc(100vh - ${NAVBAR_HEIGHT} - ${FOOTER_HEIGHT})`}
      position='sticky'
      top={NAVBAR_HEIGHT}
      overflowY='auto'
    >
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
        <VStack width='100%' align='flex-start' gap='40px' pr={{ md: '14px', base: '0' }}>
          <VStack width='100%' align={{ md: 'flex-start', base: 'center' }} gap='12px'>
            <SkeletonCircle
              {...skeletonProps}
              size='100px'
            />
            <VStack align={{ md: 'flex-start', base: 'center' }} gap='8px' width='100%'>
              <Skeleton {...skeletonProps} height='24px' width='180px' />
              <Skeleton {...skeletonProps} height='14px' width='220px' />
            </VStack>
          </VStack>
          <Stack gap='16px' width='100%'>
            {[1, 2, 3, 4].map((i) => (
              <VStack key={i} align='stretch' gap='4px'>
                <Skeleton {...skeletonProps} height='14px' width='120px' />
                <Skeleton {...skeletonProps} height='18px' width='100%' />
              </VStack>
            ))}
          </Stack>
        </VStack>
      </Box>
    </Stack>
  );
}
