import { fetchReferralInfo } from '@/api/referrals';
import { ReferralAdditionalInfo } from '@/components/referrals/ReferralAdditionalInfo';
import { ReferralNextOfKin } from '@/components/referrals/ReferralNextOfKin';
import { ReferralInspection } from '@/components/referrals/ReferralInspections';
import { ReferralPortfolio } from '@/components/referrals/ReferralPortfolio';
import { LayoutWrapper } from '@/layout/Wrapper';
import { Flex, Stack } from '@chakra-ui/react';
import { ReferralPageContentSkeleton } from '@/components/skeletons';
import { useQuery } from '@tanstack/react-query';
import { NAVBAR_HEIGHT } from '@/layout/Navbar';
import { FOOTER_HEIGHT } from '@/layout/Footer';
import ReferralProfileSidebar from '@/components/referrals/ReferralProfileSidebar';

export const ReferralsPage = ({ id }: { id: string }) => {
  const referralData = useQuery<any>({
    queryKey: ['referralData', id],
    queryFn: () => fetchReferralInfo(id),
    enabled: !!id
  });

  const user = referralData?.data?.data?.user_info;
  const portfolio = referralData?.data?.data?.customer_investments;
  const next_of_kin = referralData?.data?.data?.next_of_kin;
  const inspection_requests = referralData?.data?.data?.inspection_requests;

  return (
    <LayoutWrapper>
      <Flex
        gap={{ base: `24px`, lg: `45px` }}
        direction={{ base: `column`, lg: `row` }}
        align={{ base: `stretch`, lg: `flex-start` }}
      >
        <ReferralProfileSidebar
          data={user}
          isLoading={referralData?.isLoading}
        />
        <Stack
          w={`100%`}
          minW={0}
          gap={{ base: `32px`, md: `40px` }}
          py={{ base: `24px`, md: `40px` }}
          px={{ base: `20px`, md: 0 }}
          pr={{ base: '20px', md: `95px` }}
          fontWeight={`600`}
          fontSize={{ base: `18px`, md: `20px` }}
          lineHeight={`100%`}
          letterSpacing={`-2%`}
        >
          {referralData?.isLoading ? (
            <ReferralPageContentSkeleton />
          ) : (
            <>
              <ReferralPortfolio portfolio={portfolio} />
              <ReferralInspection inspection_requests={inspection_requests} />
              <ReferralAdditionalInfo userInfo={user} />
              <ReferralNextOfKin nextOfKinList={next_of_kin} />
            </>
          )}
        </Stack>
      </Flex>
    </LayoutWrapper>
  );
};
