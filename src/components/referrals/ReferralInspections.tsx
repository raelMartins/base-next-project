import {
  Avatar,
  Divider,
  Flex,
  HStack,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react';
import {
  InPersonInspectionIcon,
  InspectionIcon,
  VirtualInspectionIcon
} from '../assets/referrals';
import { EmptyState } from '@/layout/states/EmptyState';
import moment from 'moment';

export const ReferralInspection = ({
  inspection_requests
}: {
  inspection_requests: any;
}) => {
  // const requests = inspection_requests?.open || []
  const requests = inspection_requests?.open?.slice(0, 3) || [];
  return (
    <Stack
      gap={`0px`}
      width={`100%`}
      border={'1px solid'}
      borderColor={'#E4E4E7'}
      borderRadius={`12px`}
    >
      <HStack padding={`16px 24px`} gap={`8px`}>
        <InspectionIcon />
        <Text>Inspection</Text>
      </HStack>{' '}
      <Divider margin={`0px !important`} borderColor={'#e4e4e7'} />
      {!requests?.length ? (
        <EmptyState height='300px' />
      ) : (
        <Stack py={`32px`} gap={`32px`}>
          {requests?.map((el: any, i: number) => (
            <HStack gap={'16px'} flex={`1`} key={i} padding={`0px 24px`}>
              <Avatar
                src={el?.project?.photos?.[0]?.photo || `/`}
                boxSize={`60px`}
                name={el?.project?.name || `Not Available`}
              />

              <Stack
                flex='1'
                gap={'4px'}
                textAlign={'left'}
                letterSpacing={`0%`}
              >
                <Text>{el?.project?.name}</Text>

                <Text color={'#52525B'} fontSize={`14px`} fontWeight={`500`}>
                  {moment(el?.time).format('MMMM Do . HH:mm A')}
                </Text>
              </Stack>
              <Flex
                align={`center`}
                gap={`4px`}
                fontWeight={`600`}
                fontSize={`16px `}
                lineHeight={`150% `}
                letterSpacing={`-2% `}
                color={'#3737D1'}
                minW={`max-content`}
              >
                {el?.tour_method?.toLowerCase()?.includes('vi') ? (
                  <>
                    <VirtualInspectionIcon />
                    <Text>Video Chat</Text>
                  </>
                ) : (
                  <>
                    <InPersonInspectionIcon />
                    <Text>In Person</Text>
                  </>
                )}
              </Flex>
            </HStack>
          ))}
        </Stack>
      )}
    </Stack>
  );
};
