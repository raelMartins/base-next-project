import { LayoutWrapper } from '@/layout/Wrapper';
import {
  Avatar,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Text,
  VStack
} from '@chakra-ui/react';
import { TransactionSummarySkeleton } from '@/components/skeletons';
import { useQuery } from '@tanstack/react-query';
import {
  fetchAutopayBreakdown,
  fetchPastPayments,
  fetchUpcomingPayments
} from '@/api/transactions';
import { BackArrowIcon } from '@/components/assets/layout';
import { useRouter } from 'next/navigation';
import { TransactionEntry } from '@/components/transactions/TransactionEntry';
import {
  OutstandingPaymentIcon,
  PaymentReceivedIcon
} from '@/components/assets/transactions';
import { changeDateFormat, formatToCurrency } from '@veerge/utils';

export const ReferralTransactionSummary = ({
  user_id,
  id
}: {
  id: string;
  user_id: string;
}) => {
  const EQUITY_PAYMENT_DETAILS = useQuery({
    queryKey: ['autopayyBreakdown', id, user_id],
    queryFn: () => fetchAutopayBreakdown(id, user_id),
    enabled: !!(id && user_id)
  });
  const UPCOMING_PAYMENTS = useQuery({
    queryKey: ['UPCOMING_PAYMENTS', id, user_id],
    queryFn: () => fetchUpcomingPayments(id, user_id),
    enabled: !!(id && user_id)
  });
  const PAST_PAYMENTS = useQuery({
    queryKey: ['PAST_PAYMENTS', id],
    queryFn: () => fetchPastPayments(id),
    enabled: !!(id && user_id)
  });

  const equity_details = EQUITY_PAYMENT_DETAILS?.data?.data;
  const upcoming_payments = UPCOMING_PAYMENTS?.data?.data?.message;
  const past_payments = PAST_PAYMENTS?.data?.data;

  console.log({ equity_details, upcoming_payments, past_payments });

  const router = useRouter();

  const isLoading =
    EQUITY_PAYMENT_DETAILS?.isLoading ||
    UPCOMING_PAYMENTS?.isLoading ||
    PAST_PAYMENTS?.isLoading;

  const info_array = [
    {
      label: `Purchase price`,
      value: formatToCurrency({ amount: equity_details?.total_unit_price }),
      hide: !equity_details?.total_unit_price
    },
    {
      label: `Total Amount Paid`,
      value: formatToCurrency({ amount: equity_details?.amount_paid }),
      hide: !equity_details?.total_unit_price
    },
    {
      label: `Outstanding Balance`,
      value: formatToCurrency({ amount: equity_details?.total_due_balance }),
      hide: !equity_details?.total_unit_price
    },
    {
      label: `Due ${changeDateFormat(equity_details?.next_due_date, 'monthandday')}`,
      value: formatToCurrency({ amount: equity_details?.next_due_balance }),
      color: '#DC2626',
      hide: !equity_details?.next_due_balance
    }
  ];
  return (
    <LayoutWrapper>
      <Stack
        w={`100%`}
        maxW={`940px`}
        p={{ base: `38px 26px` }}
        gap={{ base: `32px` }}
        mx={`auto`}
      >
        <HStack gap={`16px`}>
          <BackArrowIcon onClick={() => router.back()} cursor={`pointer`} />
          <Heading
            fontWeight={{ base: `600` }}
            fontSize={{ base: `32px` }}
            letterSpacing={{ base: `-2%` }}
            textTransform={`capitalize`}
          >
            Transaction Summary
          </Heading>
        </HStack>
        <VStack
          align={`stretch`}
          w={`100%`}
          maxW={`810px`}
          border={`0.75px solid`}
          borderColor={'#E8E8E8'}
          borderRadius={`12px`}
          gap={`32px`}
          py={{ base: `24px` }}
        >
          {isLoading ? (
            <TransactionSummarySkeleton />
          ) : (
            <>
              <Stack
                gap={`24px`}
                borderBottom='1px solid'
                borderColor={'#e4e4e7'}
                divider={
                  <StackDivider
                    margin={`0px !important`}
                    borderColor={'#e4e4e7'}
                  />
                }
              >
                <HStack gap={`12px`} p={`24px`} pt={`0px`}>
                  <Avatar
                    boxSize={`60px`}
                    src={equity_details?.unit?.photos?.[0]?.photo}
                    name={
                      equity_details?.project?.land_title ??
                      equity_details?.project?.name
                    }
                  />
                  <Stack gap={`6px`}>
                    <Text fontWeight='600' fontSize='20px' letterSpacing='-2%'>
                      {equity_details?.project?.land_title ??
                        equity_details?.project?.name}
                    </Text>
                    <Text
                      fontWeight='500'
                      fontSize='14px'
                      lineHeight='150%'
                      letterSpacing='-1.1%'
                    >
                      {equity_details?.unit?.unit_title}
                    </Text>
                  </Stack>
                </HStack>
                <HStack
                  p={{ base: `24px` }}
                  gap={`16px`}
                  divider={
                    <StackDivider
                      margin={`0px !important`}
                      borderColor={'#e4e4e7'}
                    />
                  }
                >
                  {info_array?.map((el) =>
                    el?.hide ? null : (
                      <VStack
                        key={el?.label}
                        align={`stretch`}
                        flex={`1`}
                        gap={`6px`}
                      >
                        <Text
                          color={'#52525B'}
                          fontWeight={`500`}
                          fontSize={`14px`}
                          lineHeight={`150%`}
                          letterSpacing={`2%`}
                        >
                          {el.label}
                        </Text>
                        <Text
                          fontWeight={'600'}
                          fontSize={'18px'}
                          lineHeight={'120%'}
                          letterSpacing={'-2%'}
                          color={el?.color}
                        >
                          {el?.value}
                        </Text>
                      </VStack>
                    )
                  )}
                </HStack>
              </Stack>
              {past_payments?.length ? (
                <Stack gap={`16px`}>
                  <Text
                    fontWeight={{ base: '600' }}
                    fontSize={{ base: '20px' }}
                    lineHeight={{ base: '21px' }}
                    letterSpacing={{ base: '-2%' }}
                    px={{ base: `24px` }}
                  >
                    Previous Payments
                  </Text>
                  <VStack
                    align={`stretch`}
                    gap={`0px`}
                    divider={
                      <StackDivider
                        margin={`0px !important`}
                        borderColor={'#E8E8E8'}
                      />
                    }
                  >
                    {past_payments?.map((request: any) => (
                      <TransactionEntry
                        icon={<PaymentReceivedIcon />}
                        label='Payment Received'
                        showConnectedProject={false}
                        key={request?.id}
                        data={request}
                      />
                    ))}
                  </VStack>
                </Stack>
              ) : null}
              {upcoming_payments?.length ? (
                <Stack gap={`16px`}>
                  <Text
                    fontWeight={{ base: '600' }}
                    fontSize={{ base: '20px' }}
                    lineHeight={{ base: '21px' }}
                    letterSpacing={{ base: '-2%' }}
                    px={{ base: `24px` }}
                  >
                    Upcoming Payments
                  </Text>
                  <VStack
                    align={`stretch`}
                    gap={`0px`}
                    divider={
                      <StackDivider
                        margin={`0px !important`}
                        borderColor={'#E8E8E8'}
                      />
                    }
                  >
                    {upcoming_payments?.map((request: any) => (
                      <TransactionEntry
                        icon={<OutstandingPaymentIcon />}
                        label='Outstanding Payment'
                        showConnectedProject={false}
                        key={request?.id}
                        data={request}
                      />
                    ))}
                  </VStack>
                </Stack>
              ) : null}
            </>
          )}
        </VStack>
      </Stack>
    </LayoutWrapper>
  );
};
