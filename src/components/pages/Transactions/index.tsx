import { fetchAccountInfo } from '@/api/auth';
import { accountTransactions } from '@/api/transactions';
import { GeneralFeedbackIcon } from '@/components/assets/navbar/sidemenu';
import { CommissionSidePanel } from '@/components/transactions/commissions/CommissionsSidePanel';
import { TransactionEntry } from '@/components/transactions/TransactionEntry';
import { LayoutWrapper } from '@/layout/Wrapper';
import {
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
  VStack
} from '@chakra-ui/react';
import { TransactionEntrySkeleton } from '@/components/skeletons';
import { useSkeletonCount } from '@/utils/hooks/useSkeletonCount';
import { useQuery } from '@tanstack/react-query';

export const TransactionsPage = () => {
  const skeletonCount = useSkeletonCount();
  const { data: transactionsData, isLoading } = useQuery({
    queryKey: ['account-transactions'],
    queryFn: accountTransactions
  });

  console.log({ transactionsData });

  const transactions: any = transactionsData?.data?.data.filter(
    (nullTrans: any) =>
      nullTrans?.transaction_type === 'commission' &&
      nullTrans?.connected_request !== null
  );

  return (
    <LayoutWrapper>
      <Flex
        gap={{ base: `24px`, lg: `20px` }}
        direction={{ base: `column`, lg: `row` }}
        align={{ base: `stretch`, lg: `flex-start` }}
      >
        <Stack
          w={`100%`}
          minW={0}
          p={{ base: '16px 20px', md: '24px 32px', xl: `42px 120px` }}
          gap={{ base: `24px` }}
        >
          <Heading
            fontWeight={{ base: `600` }}
            fontSize={{ base: `24px`, md: `32px` }}
            letterSpacing={{ base: `-2%` }}
          >
            Transactions
          </Heading>

          <VStack
            align={`stretch`}
            w={`100%`}
            border={`0.75px solid`}
            borderColor={'#E8E8E8'}
            borderRadius={`12px`}
            gap={`0px`}
            divider={
              <StackDivider margin={`0px !important`} borderColor={'#E8E8E8'} />
            }
          >
            {isLoading ? (
              Array.from({ length: skeletonCount }).map((_, i) => (
                <TransactionEntrySkeleton key={i} />
              ))
            ) : !transactions?.length ? (
              <VStack
                w={`100%`}
                p={`42px`}
                height={`400px`}
                justify={'center'}
                gap={`4px`}
              >
                <GeneralFeedbackIcon boxSize={`36px`} />
                <Text
                  fontSize={`16px`}
                  fontWeight={`600`}
                  textTransform={`uppercase`}
                >
                  Nothing Found
                </Text>
                <Text fontSize={`14px`} fontWeight={`400`}>
                  No results found
                </Text>
              </VStack>
            ) : (
              transactions?.map((request: any) => (
                <>
                  <TransactionEntry key={request?.id} data={request} />
                </>
              ))
            )}
          </VStack>
        </Stack>
        <CommissionSidePanel />
      </Flex>
    </LayoutWrapper>
  );
};
