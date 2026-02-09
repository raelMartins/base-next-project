import { Box, Center, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import { SettlementAccountIcon } from '../../assets/transactions/commissions';
import { formatTimestamp } from '../../request/Request';
import { useQuery } from '@tanstack/react-query';
import { fetchRecentCommissions } from '@/api/transactions';

export const PendingPayouts = () => {
  // const pendingPayouts = [
  //   {
  //     unit_title: `Astrid 2.0`,
  //     listing_name: '3 Bedroom',
  //     email: 'avabrown@gmail.com',
  //     date: new Date(`2026-01-26`).toDateString()
  //   },
  //   {
  //     unit_title: `Astrid 2.0`,
  //     listing_name: '3 Bedroom',
  //     email: 'avabrown@gmail.com',
  //     date: new Date(`2026-01-26`).toDateString()
  //   }
  // ];
  const pendingPayouts: any[] = [];

  // const { data: recentCommissionData } = useQuery({
  //   queryKey: ['recentCommissionData'],
  //   queryFn: fetchRecentCommissions
  // });

  // console.log({ recentCommissionData, pendingPayouts });
  return !pendingPayouts?.length ? null : (
    <Stack gap={`0px`}>
      <Text
        fontWeight={'500'}
        fontSize={'16px'}
        lineHeight={'100%'}
        letterSpacing={'0%'}
        p={`16px 24px`}
        color={`#71717A`}
        margin={`0px`}
      >
        Pending Payouts
      </Text>
      <VStack align={`stretch`} gap={`0px`}>
        {pendingPayouts?.map((data) => (
          <HStack cursor={`pointer`} gap={`9px`} p={`15px 24px`}>
            <Center position={`relative`} boxSize={`40px`}>
              <SettlementAccountIcon />
              <Box
                position={`absolute`}
                bottom={`0px`}
                right={`0px`}
                boxSize={`10px`}
                borderRadius={`full`}
                bg={'#EA580C'}
              />
            </Center>
            <Stack p={`10px`}>
              <Text
                fontWeight={`500`}
                fontSize={`16px`}
                lineHeight={`100%`}
                letterSpacing={`0%`}
              >
                {data?.unit_title}, {data?.listing_name}
              </Text>
              <Text
                color={`#71717A`}
                fontWeight={'400'}
                fontSize={'14px'}
                lineHeight={'100%'}
                letterSpacing={'0%'}
              >
                {data?.email}, {formatTimestamp(data?.date)}
              </Text>
            </Stack>
          </HStack>
        ))}
      </VStack>
    </Stack>
  );
};
