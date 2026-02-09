import {
  HStack,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import { CommissionSidebarSkeleton } from '@/components/skeletons';
import {
  ReportTransactionIcon,
  RequestCommissionIcon
} from '../../assets/transactions/commissions';
import { SettleAccounts } from './SettlementAccounts';
import { NAVBAR_HEIGHT } from '@/layout/Navbar';
import { FOOTER_HEIGHT } from '@/layout/Footer';
import { PendingPayouts } from './PendingPayouts';
import { useQuery } from '@tanstack/react-query';
import { fetchAccountInfo } from '@/api/auth';
import { fetchRealtorSettingsInfo } from '@/api/profile';
import { formatToCurrency } from '@veerge/utils';
import { CommissionRequestDrawer } from './CommissionRequestDrawer';
import { ReportTransactionDrawer } from './ReportTransactionDrawer';

export const CommissionSidePanel = ({}) => {
  const { data: accountInfo, isLoading } = useQuery({
    queryKey: ['account-info'],
    queryFn: fetchAccountInfo
  });
  const { data: settingsInfo, isLoading: na } = useQuery({
    queryKey: ['account-settings-info'],
    queryFn: fetchRealtorSettingsInfo
  });

  const account = accountInfo?.data;
  console.log({ account });
  const commission_disclosure = useDisclosure();
  const report_transaction_disclosure = useDisclosure();

  return (
    <>
      <Stack
        position={{ base: `relative`, lg: `sticky` }}
        top={NAVBAR_HEIGHT}
        height={{
          base: `auto`,
          lg: `calc(100vh - ${NAVBAR_HEIGHT} - ${FOOTER_HEIGHT})`
        }}
        w={{ base: `100%`, lg: `400px` }}
        minW={{ base: `0`, lg: `400px` }}
        overflow={`auto`}
        gap={`0px`}
        borderLeft={{ base: `none`, lg: `0.5px solid` }}
        borderColor={'#E4E4E7 !important'}
        divider={
          <StackDivider margin={`0px !important`} borderColor={'#E4E4E7'} />
        }
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
        <VStack
          p={{ base: `24px 20px`, md: `32px 28px`, lg: `46px 38px` }}
          gap={`6px`}
        >
          {isLoading ? (
            <CommissionSidebarSkeleton />
          ) : (
            <>
              <Text
                fontWeight={'500'}
                fontSize={'14px'}
                letterSpacing={'-0.6%'}
                color={'#52525B'}
              >
                Total Commission received
              </Text>
              <Text
                fontWeight={'700'}
                fontSize={'30px'}
                letterSpacing={'-3%'}
                color={'#18181B'}
              >
                {formatToCurrency({ amount: account?.total_commission ?? 0 })}
                {/* <Box as='span' fontSize={`14px`}>
            .00
          </Box> */}
              </Text>
            </>
          )}
        </VStack>
        <PendingPayouts />
        <SettleAccounts />
        <VStack align={`stretch`} p={{ base: `20px`, lg: `24px` }} gap={`24px`}>
          <HStack
            gap={`12px`}
            fontWeight={'500'}
            fontSize={'14px'}
            lineHeight={'150%'}
            letterSpacing={'0%'}
            cursor={`pointer`}
            onClick={commission_disclosure?.onOpen}
          >
            <RequestCommissionIcon />
            <Text>Request a Commission</Text>
          </HStack>
          <HStack
            gap={`12px`}
            fontWeight={'500'}
            fontSize={'14px'}
            lineHeight={'150%'}
            letterSpacing={'0%'}
            cursor={`pointer`}
            onClick={report_transaction_disclosure?.onOpen}
          >
            <ReportTransactionIcon />
            <Text>Report a Transaction</Text>
          </HStack>
        </VStack>
        <CommissionRequestDrawer disclosure={commission_disclosure} />
        <ReportTransactionDrawer disclosure={report_transaction_disclosure} />
      </Stack>
    </>
  );
};
