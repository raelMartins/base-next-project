import {
  Button,
  Center,
  Flex,
  HStack,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react';
import { SettlementAccountIcon } from '../../assets/transactions/commissions';
import { IoChevronForward } from 'react-icons/io5';
import { formatTimestamp } from '../../request/Request';
import { useQuery } from '@tanstack/react-query';
import { fetchRealtorSettingsInfo } from '@/api/profile';
import { fetchSettlementAccounts } from '@/api/transactions';
import { SettlementAccountEntrySkeleton } from '@/components/skeletons';
import { useSkeletonCount } from '@/utils/hooks/useSkeletonCount';
import { fixIcon } from '../../../utils/helpers/fix-icon';

const ChevronForwardIcon = fixIcon(IoChevronForward);

export const SettleAccounts = () => {
  const skeletonCount = useSkeletonCount();
  const settlementAccounts = [
    {
      bank: `Zenith Bank`,
      account_number: '0776415642',
      date: new Date(`2026-01-26`).toDateString()
    },
    {
      bank: `Access Bank`,
      account_number: '2116877260',
      date: new Date(`2026-01-30`).toDateString()
    }
  ];

  const { data: settingsInfo } = useQuery({
    queryKey: ['account-settings-info'],
    queryFn: fetchRealtorSettingsInfo
  });
  const { data: settlement_accounts_data, isLoading } = useQuery({
    queryKey: ['settlement-accounts'],
    queryFn: fetchSettlementAccounts
  });

  console.log({ settingsInfo, settlement_accounts_data, settlementAccounts });

  const accounts = settlement_accounts_data?.data?.data;
  const accounts_2 = settingsInfo?.data?.message?.banks;

  return (
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
        Settlement Accounts
      </Text>
      {isLoading ? (
        <VStack align='stretch' gap='0px'>
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <SettlementAccountEntrySkeleton key={i} />
          ))}
        </VStack>
      ) : !accounts?.length ? (
        <HStack cursor={`pointer`} gap={`0px`} p={`15px 24px`}>
          <Flex gap={`9px`} align={`center`} flex={`1`}>
            <Center>
              <SettlementAccountIcon />
            </Center>
            <Stack p={`10px`}>
              <Text
                fontWeight={`500`}
                fontSize={`16px`}
                lineHeight={`100%`}
                letterSpacing={`0%`}
              >
                Setup payout account
              </Text>
              <Text
                color={`#71717A`}
                fontWeight={'400'}
                fontSize={'14px'}
                lineHeight={'100%'}
                letterSpacing={'0%'}
              >
                Add a new settlement account.
              </Text>
            </Stack>
          </Flex>
          <Center color={`#71717A`}>
            <ChevronForwardIcon />
          </Center>
        </HStack>
      ) : (
        <VStack align={`stretch`} gap={`0px`}>
          {accounts?.map((data: any) => (
            <HStack cursor={`pointer`} gap={`9px`} p={`15px 24px`}>
              <Center>
                <SettlementAccountIcon
                  color={'#116932'}
                  background={'#DCFCE7'}
                />
              </Center>
              <Stack p={`10px`}>
                <Text
                  fontWeight={`500`}
                  fontSize={`16px`}
                  lineHeight={`100%`}
                  letterSpacing={`0%`}
                >
                  {data?.account_number} [{data?.bank}]
                </Text>
                <Text
                  color={`#71717A`}
                  fontWeight={'400'}
                  fontSize={'14px'}
                  lineHeight={'100%'}
                  letterSpacing={'0%'}
                >
                  Added {formatTimestamp(data?.date)}
                </Text>
              </Stack>
            </HStack>
          ))}
          <HStack padding={`24px`} w={`100%`}>
            <Button
              padding={`13.5px`}
              bg={`transparent`}
              color={'#71717A'}
              cursor={`pointer`}
              border={'1px solid'}
              borderColor={'#E4E4E7'}
              borderRadius={`full`}
              fontWeight={'500'}
              fontSize={'14px'}
              lineHeight={'100%'}
              letterSpacing={'0%'}
              w={`100%`}
            >
              Manage Bank Account
            </Button>
          </HStack>
        </VStack>
      )}
    </Stack>
  );
};
