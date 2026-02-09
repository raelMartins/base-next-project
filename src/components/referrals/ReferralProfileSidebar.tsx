import {
  Avatar,
  Box,
  Center,
  HStack,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react';
import { CrystalIcon } from '../assets/Profile/icons';
import { NAVBAR_HEIGHT } from '@/layout/Navbar';
import { FOOTER_HEIGHT } from '@/layout/Footer';
import { changeDateFormat } from '@veerge/utils';
import { ReferralProfileSidebarSkeleton } from '@/components/skeletons';

export default function ReferralProfileSidebar({
  data,
  isLoading
}: {
  data: any;
  isLoading?: boolean;
}) {
  console.log({ sidebar_data: data });

  const user_info = [
    { title: 'Email address', value: data?.email, hide: isLoading },
    { title: 'Phone Number', value: data?.phone, hide: isLoading },
    {
      title: 'Alternate Phone Number',
      value: data?.alternate_phone,
      hide: !data?.alternate_phone || isLoading
    },
    {
      title: 'Date Joined',
      value: changeDateFormat(data?.referred_at),
      hide: isLoading
    },
    {
      title: 'Referred By',
      value: (
        <HStack>
          <Avatar
            src={data?.user?.referred_by?.avatar}
            name={
              data?.user?.referred_by?.name ??
              `${data?.user?.referred_by?.first_name} ${data?.user?.referred_by?.last_name}`
            }
            boxSize={`32px`}
          />
          <Text>
            {data?.user?.referred_by?.name ??
              `${data?.user?.referred_by?.first_name} ${data?.user?.referred_by?.last_name}`}
          </Text>
        </HStack>
      ),
      hide: !data?.user?.referred_by || isLoading
    }
  ];

  if (isLoading) {
    return <ReferralProfileSidebarSkeleton />;
  }

  return (
    <Stack
      w={{ base: `100%`, lg: `400px` }}
      minW={{ base: `0`, lg: `400px` }}
      borderRight={{ base: `none`, lg: '1px solid' }}
      borderBottom={{ base: '1px solid', lg: 'none' }}
      borderColor={'#E4E4E7'}
      p={{ base: `24px 20px`, md: `40px 32px`, lg: `55px 50px` }}
      py={{ base: `24px`, lg: `0px` }}
      height={{ base: `auto`, lg: `calc(100vh - ${NAVBAR_HEIGHT} - ${FOOTER_HEIGHT})` }}
      position={{ base: `relative`, lg: `sticky` }}
      top={NAVBAR_HEIGHT}
      overflowY={`auto`}
      sx={{
        '&::-webkit-scrollbar': {
          width: '4px', // Width of vertical scrollbar
          height: '4px' // Height of horizontal scrollbar
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent'
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'gray.300', // Scrollbar color
          borderRadius: '24px'
        }
      }}
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
            <Avatar
              boxSize='100px'
              minWidth='100px'
              src={data?.avatar}
              name={
                data?.first_name
                  ? `${data?.first_name} ${data?.last_name}`
                  : `Not Available`
              }
            />
            <VStack
              align={{ md: 'flex-start', base: 'center' }}
              textAlign={{ md: 'left', base: 'center' }}
              gap='8px'
            >
              <Text
                fontSize='24px'
                fontWeight='600'
                lineHeight='24px'
                letterSpacing='-2%'
              >
                {data?.first_name} {data?.last_name}
              </Text>
              <Text
                fontSize='13.5px'
                fontWeight='500'
                lineHeight='20px'
                color='#71717A'
              >
                {data?.email}
              </Text>
              {data?.is_tier3 ? (
                <HStack
                  color={'#2929A3'}
                  gap={`4px`}
                  padding={`4px 10px`}
                  borderRadius={`full`}
                  bg={'#DADAFF'}
                >
                  <Center boxSize='24px' minWidth='24px'>
                    <CrystalIcon />
                  </Center>
                  <Text
                    fontWeight='500'
                    fontSize='13.5px'
                    lineHeight='150%'
                    letterSpacing='0%'
                    noOfLines={1}
                  >
                    Sub. with most unit
                  </Text>
                </HStack>
              ) : null}
            </VStack>
          </VStack>
          <Stack
            gap={{ md: '16px', base: '24px' }}
            px={{ md: '0', base: '24px' }}
          >
            {user_info.map(({ title, value, hide }) =>
              hide ? null : (
                <VStack key={title} align={`stretch`} gap='4px'>
                  <Text
                    fontSize={{ md: '13.5px', base: '13px' }}
                    fontWeight='500'
                    lineHeight='20px'
                    color='#71717A'
                  >
                    {title}
                  </Text>
                  <Text
                    fontSize={{ md: '16px', base: '15px' }}
                    fontWeight='500'
                    lineHeight='21px'
                    letterSpacing='-2%'
                    color='#18181B'
                  >
                    {value}
                  </Text>
                </VStack>
              )
            )}
          </Stack>
        </VStack>
      </Box>
    </Stack>
  );
}
