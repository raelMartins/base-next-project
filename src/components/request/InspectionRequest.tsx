import {
  Avatar,
  Box,
  Center,
  HStack,
  Link,
  Stack,
  Text
} from '@chakra-ui/react';
import { InspectionRequestInstance } from './types';
import { formatTimestamp, monthDayYear } from './Request';

export const InspectionRequest = ({
  data
}: {
  data: InspectionRequestInstance;
}) => {
  const user = data?.users;
  return (
    <HStack p={{ base: '8px', lg: '16px' }} gap={'12px'}>
      <Center boxSize={`40px`} cursor={`pointer`} position={`relative`}>
        <Avatar
          src={user?.avatar || ``}
          boxSize={`40px`}
          name={
            user?.first_name
              ? `${user?.first_name} ${user?.last_name}`
              : `Not Available`
          }
        />
        <Box
          position={`absolute`}
          bottom={`0px`}
          right={`0px`}
          boxSize={`10px`}
          borderRadius={`full`}
          bg={
            data?.status?.toLowerCase() == `rejected`
              ? '#DC2626'
              : data?.status?.toLowerCase() == 'done' ||
                  data?.status?.toLowerCase() == 'approved' ||
                  data?.status?.toLowerCase() == 'accepted'
                ? '#16A34A'
                : '#EA580C'
          }
        />
      </Center>
      <Stack
        flex='1'
        fontSize={'16px'}
        color='#27272A'
        lineHeight={'150%'}
        fontWeight={'500'}
        gap={'4px'}
        textAlign={'left'}
        letterSpacing={`0%`}
      >
        <Text>
          <Link
            href={`/referrals/${user?.user?.id}`}
            color='#1F1FBC'
            textTransform={'capitalize'}
          >
            {user?.first_name} {user?.last_name}
            &apos;s
          </Link>{' '}
          scheduled{' '}
          <b style={{ textTransform: 'capitalize' }}>
            {data?.tour_method}
          </b>{' '}
          inspection for{' '}
          <b style={{ textTransform: 'capitalize' }}>
            {data?.project?.name} {data?.project?.building_type},{' '}
            {data?.project?.address}
          </b>{' '}
          on{' '}
          <b style={{ textTransform: 'capitalize' }}>
            {monthDayYear(data?.date)}
          </b>{' '}
          at <b style={{ textTransform: 'capitalize' }}>{data?.time}</b>
          {data?.status?.toLowerCase() === 'pending'
            ? ' is pending'
            : ` has been ${data?.status?.toLowerCase()}`}
          .
        </Text>
        <Text color={'#71717A'} fontSize={`14px`}>
          {formatTimestamp(data?.created_at, true)}
        </Text>
      </Stack>
    </HStack>
  );
};
