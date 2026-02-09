import {
  Box,
  Center,
  HStack,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react';
import { PortfolioIcon, PropertyTagIcon } from '../assets/referrals';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { formatToCurrency, shortenPrice } from '@veerge/utils';

export const ReferralPortfolio = ({ portfolio }: { portfolio: any[] }) => {
  const pathname = usePathname();

  return (
    <Stack
      gap={`0px`}
      width={`100%`}
      border={'1px solid'}
      borderColor={'#E4E4E7'}
      borderRadius={`12px`}
      divider={
        <StackDivider margin={`0px !important`} borderColor={'#e4e4e7'} />
      }
    >
      <HStack padding={`16px 24px`} gap={`8px`}>
        <PortfolioIcon />
        <Text>Portfolio</Text>
      </HStack>
      {portfolio?.map((el: any, i: number) => (
        <HStack
          as={Link}
          href={`${pathname}/transaction-summary/${el.equity_id}`}
          key={i}
          padding={`20px 24px 32px`}
        >
          <Stack gap={`18px`} flex={1}>
            <Text fontSize={`24px`} textTransform={`capitalize`}>
              {el?.project?.payment_plan
                ? `${el?.project?.payment_plan} Plan`
                : 'Outright Payment'}{' '}
              {el?.defaulting &&
              el?.defaulting?.toLowerCase() !== 'completed' ? (
                <Box
                  as='span'
                  color={
                    el?.status?.toLowerCase() == 'pending'
                      ? '#EA580C'
                      : el?.status?.toLowerCase() == 'rejected' ||
                          el?.status?.toLowerCase() == 'expired'
                        ? '#DC2626'
                        : '#16A34A'
                  }
                >
                  [{el?.defaulting}]
                </Box>
              ) : null}
            </Text>
            <HStack
              gap={`12px`}
              fontWeight={`500`}
              fontSize={`13px`}
              lineHeight={`150%`}
              letterSpacing={`2%`}
              flexWrap={`wrap`}
              divider={
                <StackDivider
                  aria-orientation='vertical'
                  margin={`0px !important`}
                  borderColor={'#e4e4e7'}
                />
              }
            >
              {el?.purchase_price > 0 ? (
                <Text>₦{shortenPrice(el?.purchase_price)} Purchase Price</Text>
              ) : null}
              {el?.total_paid > 0 ? (
                <Text>₦{shortenPrice(el?.total_paid)} Paid</Text>
              ) : null}
              {el?.current_outstanding_balance > 0 ? (
                <Text>
                  ₦{shortenPrice(el?.current_outstanding_balance)} Outstanding
                </Text>
              ) : null}
            </HStack>
            <HStack marginTop={`22px`} gap={`8px`}>
              <PropertyTagIcon status={el?.status} />
              <Text
                fontWeight={`500`}
                fontSize={`13px`}
                lineHeight={`150%`}
                letterSpacing={`-2%`}
              >
                {el?.project?.project?.name}
              </Text>
            </HStack>
          </Stack>

          {el?.project?.project?.photos?.[0]?.photo ? (
            <Center
              boxSize={`100px`}
              minW={`100px`}
              borderRadius={`8px`}
              position={`relative`}
              overflow={`hidden`}
            >
              <Image
                src={el?.project?.project?.photos?.[0]?.photo}
                alt={el?.project?.project?.name}
                fill
                style={{ objectFit: `cover` }}
              />
            </Center>
          ) : null}
        </HStack>
      ))}
    </Stack>
  );
};
