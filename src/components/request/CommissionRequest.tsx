import {
  Avatar,
  Box,
  Center,
  HStack,
  Link,
  Stack,
  Text
} from '@chakra-ui/react';
import { CommissionRequestInstance } from './types';
import { formatTimestamp } from './Request';

export const CommissionRequest = ({
  data
}: {
  data: CommissionRequestInstance;
}) => {
  const user = data?.customer;
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
              : data?.status?.toLowerCase() == 'paid' ||
                  data?.status?.toLowerCase() == 'approved'
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
          Your commission request for{' '}
          <Link
            href={`/realtors_portal/referral/${user?.user?.id}`}
            color='#1F1FBC'
            textTransform={'capitalize'}
          >
            {user?.first_name} {user?.last_name}
            &apos;s
          </Link>{' '}
          <b style={{ textTransform: 'capitalize' }}>{data?.property_info}</b>
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
