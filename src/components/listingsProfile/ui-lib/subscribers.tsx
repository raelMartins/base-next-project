import {
  Avatar,
  Button,
  Grid,
  HStack,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import SubscribersDrawer from "./subscribersDrawer";
import { getSubscribers } from "@/api/listings";
import { useQuery } from "@tanstack/react-query";
import { business_id } from "@/constants/routes";
import { convertToQuery } from "@/utils/functions/convertToQuery";
import { SubscribersIcon } from "../../assets/listings/AlignCenterVertical";

const Subscribers = ({ listing_id }: { listing_id: string }) => {
  const businessId = business_id();
  const paramObj = {
    business_id: businessId,
    listing_id,
    limit: 6,
  };
  const param = convertToQuery(paramObj);

  const SUBSCRIBERS_QUERY = useQuery({
    queryKey: ["subscribers-count", listing_id, param],
    queryFn: () => getSubscribers(param),
  });
  const subscribers: any[] = SUBSCRIBERS_QUERY.data?.data?.results?.length
    ? (SUBSCRIBERS_QUERY.data?.data?.results ?? []).map((item: any) => ({
        name: `${item?.first_name} ${item?.last_name}`,
        avatar: item?.avatar,
        unitName: item?.unit_purchases?.[0]?.unit_title,
      }))
    : [];

  console.log({ subData: SUBSCRIBERS_QUERY.data?.data?.results, subscribers });
  return (
    <Stack display={subscribers?.length ? "flex" : "none"} spacing="24px">
      <StackDivider borderBottom="0.5px solid #D4D4D8 !important" />
      <Stack spacing="32px">
        <HStack justify="space-between">
          <HStack>
            <SubscribersIcon />
            <Text
              as="h2"
              fontWeight="600"
              fontSize="16px"
              lineHeight="24px"
              letterSpacing="-1%"
              color="#1A1A1A"
            >
              Subscribers
            </Text>
          </HStack>
          <SubscribersDrawer listing_id={listing_id}>
            <Button
              color="#3636E2"
              p="0px"
              minH="fit-content"
              h="fit-content"
              _hover={{
                p: "0px",
                bg: "transparent",
              }}
              _active={{
                p: "0px",
                bg: "transparent",
              }}
              variant="ghost"
            >
              View All
            </Button>
          </SubscribersDrawer>
        </HStack>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap="32px">
          {subscribers.map((subscriber, idx) => (
            <VStack
              flexDir={{ base: "row", md: "column" }}
              key={idx}
              align="center"
            >
              <Avatar
                boxSize="60px"
                name={`${subscriber?.name}`}
                src={undefined}
              />
              <VStack align={{ base: "start", xl: "center" }} spacing="4px">
                <Text
                  fontWeight="500"
                  fontSize="16px"
                  lineHeight="100%"
                  letterSpacing="-1%"
                  color="#27272A"
                  textAlign="center"
                >
                  {subscriber?.name}
                </Text>
                <Text
                  fontWeight="400"
                  fontSize="13px"
                  lineHeight="100%"
                  letterSpacing="-1%"
                  color="#3F3F46"
                  textAlign="center"
                >
                  {subscriber?.unitName}
                </Text>
              </VStack>
            </VStack>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Subscribers;

// const SubscriberComponent = ({ subscriber }: any) => {
//   return (
//     <VStack align="center">
//       <Avatar boxSize="60px" name={`${subscriber?.name}`} src={undefined} />
//       <VStack align="center" spacing="4px">
//         <Text
//           fontWeight="500"
//           fontSize="16px"
//           lineHeight="100%"
//           letterSpacing="-1%"
//           color="#27272A"
//           textAlign="center"
//         >
//           {subscriber?.name}
//         </Text>
//         <Text
//           fontWeight="400"
//           fontSize="13px"
//           lineHeight="100%"
//           letterSpacing="-1%"
//           color="#3F3F46"
//           textAlign="center"
//         >
//           {subscriber?.unitName}
//         </Text>
//       </VStack>
//     </VStack>
//   );
// };
