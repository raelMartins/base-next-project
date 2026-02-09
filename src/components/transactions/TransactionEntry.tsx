import {
  Avatar,
  Box,
  Center,
  Flex,
  HStack,
  Link,
  Stack,
  Text
} from '@chakra-ui/react';
import { formatTimestamp } from '../request/Request';
import { TransactionEntryType } from './types';
import { ReactElement } from 'react';
import { formatToCurrency } from '@veerge/utils';

export const TransactionEntry = ({
  data,
  icon,
  label,
  showConnectedProject = true
}: {
  data: TransactionEntryType;
  icon?: ReactElement;
  label?: string;
  showConnectedProject?: boolean;
}) => {
  const user = data?.connected_request?.customer;
  return (
    <Flex p={{ base: '8px', lg: '16px' }} gap={`0px`} align={`center`}>
      <HStack gap={'12px'} flex={`1`}>
        {icon ?? (
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
                data?.status == `rejected`
                  ? '#DC2626'
                  : data?.status == 'paid' ||
                      data?.status == 'approved' ||
                      data?.status == 'success'
                    ? '#16A34A'
                    : '#EA580C'
              }
            />
          </Center>
        )}
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
            {label ? label : `${user?.first_name} ${user?.last_name}`}
          </Text>

          <Text color={'#71717A'} fontSize={`14px`}>
            {showConnectedProject && data?.connected_request
              ? `${data?.connected_request?.unit?.unit_title}, 
            ${data?.connected_request?.unit?.project?.name}. `
              : ``}
            {formatTimestamp(data?.created_at, true)}
          </Text>
        </Stack>
      </HStack>
      <Text
        fontWeight={`500`}
        fontSize={`16px`}
        lineHeight={`15px`}
        letterSpacing={`0%`}
      >
        {formatToCurrency({ amount: data.amount ?? 0 })}
      </Text>
    </Flex>
  );
};
