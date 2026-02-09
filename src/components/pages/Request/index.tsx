import { fetchAgentRequest } from '@/api/request';
import { GeneralFeedbackIcon } from '@/components/assets/navbar/sidemenu';
import { Request } from '@/components/request/Request';
import {
  CommissionRequestInstance,
  InspectionRequestInstance
} from '@/components/request/types';
import { CommissionSidePanel } from '@/components/transactions/commissions/CommissionsSidePanel';
import { LayoutWrapper } from '@/layout/Wrapper';
import { StateContext } from '@/providers/StateContext';
import {
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
  VStack
} from '@chakra-ui/react';
import { RequestEntrySkeleton } from '@/components/skeletons';
import { useSkeletonCount } from '@/utils/hooks/useSkeletonCount';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useContext } from 'react';

export const RequestPage = () => {
  const state = useContext(StateContext);
  const skeletonCount = useSkeletonCount();
  console.log({ state });
  const searchParams = useSearchParams();

  // const tab = searchParams.get('tab');
  // const history = searchParams.get('history');
  const tab: 'inspection' | 'commission' = 'commission';
  const history = true;

  const { data, isLoading } = useQuery({
    queryKey: ['agent_requests', tab, history],
    queryFn: () => fetchAgentRequest(!history ? `?status=pending` : ``)
  });

  const list_data = {
    listing_inspection: !data ? [] : data?.data?.inspection_requests,
    sales_commission: !data ? [] : data?.data?.commission_requests
  };

  const request_list =
    tab == 'commission'
      ? (list_data?.sales_commission as CommissionRequestInstance[])
      : (list_data?.listing_inspection as InspectionRequestInstance[]);

  console.log(list_data);
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
          p={{ base: `16px 20px`, md: `24px 32px`, xl: `42px 120px` }}
          gap={{ base: `24px` }}
        >
          <Heading
            fontWeight={{ base: `600` }}
            fontSize={{ base: `24px`, md: `32px` }}
            letterSpacing={{ base: `-2%` }}
            textTransform={`capitalize`}
          >
            {/* {tab ? tab : `Inspection`} Request {history ? 'History' : ''} */}
            Request History
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
                <RequestEntrySkeleton key={i} />
              ))
            ) : !request_list?.length ? (
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
              request_list?.map((request, i) => (
                <Request key={i} data={request} tab={tab as string} />
              ))
            )}
          </VStack>
        </Stack>
        {tab == 'commission' ? <CommissionSidePanel /> : null}
      </Flex>
    </LayoutWrapper>
  );
};
