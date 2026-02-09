import {
  Avatar,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Spinner,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { NavNotificationsIcon } from '../components/assets/navbar';
import { CustomDrawerHeader } from './drawer/CustomDrawerHeader';
import { formatTimestamp } from '../components/request/Request';
import { useQuery } from '@tanstack/react-query';
import { fetchRealtorNotifications } from '../api/profile';
import { EmptyState } from './states/EmptyState';

export const NotificationEntry = ({ data }: { data: any }) => {
  const notif = {
    id: 234,
    agent: {
      customer_info: null,
      id: 3731,
      username: null,
      first_name: 'Mister',
      last_name: 'Realtor',
      middle_name: null,
      phone: '+2348132470992',
      avatar: 'https://matador-bucket.s3.amazonaws.com/media/80442e71-9c9.jpg',
      email: 'mistyladee002@gmail.com',
      sign_up_time: 'January 31, 2025',
      gender: 'male',
      country: 'Nigeria',
      initial_status: 'Inactive',
      status: true
    },
    message:
      'Your commission request for 3 bedroom apartment, Baldini suite has been approved and paid into your account.',
    topic: null,
    created_at: '2025-02-14T10:38:39.217013Z',
    _type: null,
    add_on: null,
    status: true,
    img: 'https://matador-bucket.s3.amazonaws.com/media/agents/notification/e37a9f7c-a81.svg',
    store_name: 252
  };

  return (
    <HStack gap={`12px`} align={`flex-start`}>
      <Avatar
        src={data?.img ?? data?.agent?.avatar}
        boxSize={`48px`}
        name={`${data?.agent?.first_name} ${data?.agent?.last_name}`}
      />
      <Stack gap={`10px`}>
        <Text
          fontWeight='500'
          fontSize='16px'
          lineHeight='140%'
          letterSpacing='-1.1%'
        >
          {data?.message}
        </Text>
        <Text
          color={'#52525b'}
          fontWeight={'500'}
          fontSize={'14px'}
          letterSpacing={'-1.1%'}
        >
          {formatTimestamp(data?.created_at)}
        </Text>
      </Stack>
    </HStack>
  );
};

export const NavNotifications = ({}) => {
  const disclosure = useDisclosure();

  const { data: notifData, isLoading } = useQuery({
    queryKey: ['account-notifications', disclosure?.isOpen],
    queryFn: fetchRealtorNotifications,
    enabled: !!disclosure?.isOpen
  });

  console.log({ notifData: notifData?.data });

  const recent = notifData?.data?.recent || [];
  const older = notifData?.data?.older || [];
  const notifications = [...recent, ...older];

  return (
    <>
      <Center cursor={`pointer`} onClick={disclosure?.onOpen}>
        <NavNotificationsIcon />
      </Center>
      <Drawer isOpen={disclosure?.isOpen} onClose={disclosure?.onClose}>
        <DrawerOverlay />
        <DrawerContent maxW={{ base: '100%', sm: '500px' }}>
          <CustomDrawerHeader title='Notification' />
          <DrawerBody
            p={`24px`}
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
            {isLoading ? (
              <Center height={`300px`}>
                <Spinner size='lg' />
              </Center>
            ) : !notifications?.length ? (
              <EmptyState />
            ) : (
              <Stack gap={`40px`}>
                {notifications?.map((el) => (
                  <NotificationEntry key={el?.id} data={el} />
                ))}
              </Stack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
