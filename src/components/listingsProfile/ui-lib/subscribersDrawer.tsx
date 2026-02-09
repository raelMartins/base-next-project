import { getSubscribers } from "@/api/listings";
import { business_id } from "@/constants/routes";
import { convertToQuery } from "@/utils/functions/convertToQuery";
import useInfiniteScrollQuery from "@/utils/hooks/useInfiniteScrollQuery";
import { customScrollbarStyles } from "@/utils/scrollbar/customScrollStyle";
import {
  Avatar,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { InfiniteData } from "@tanstack/react-query";

import React, {
  ReactElement,
  cloneElement,
  isValidElement,
  useCallback,
} from "react";

const limit = 10;
const SubscribersDrawer = ({
  children,
  listing_id,
}: {
  children: React.ReactNode;
  listing_id: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const businessId = business_id();

  const paramObj = {
    business_id: businessId,
    listing_id,
    limit: 6,
  };

  const param = convertToQuery(paramObj);
  const options = {
    queryKey: ["subscriber infinite", param, limit] as any,
    queryFn: ({ pageParam = param as any }) => {
      return getSubscribers(pageParam);
    },
    // initialData: {
    //   pages: [{data: projects}],
    //   pageParams: [param],
    // },
    getNextPageParam: (lastPage: any, allPages: InfiniteData<any>["pages"]) => {
      console.log({ lastPage });
      const maxPageNumber = Math.ceil(lastPage.data?.total_pages);
      const nextPageNumber = allPages.length + 1;

      const newQueryObj = { ...paramObj, page: nextPageNumber };

      return nextPageNumber <= maxPageNumber
        ? convertToQuery(newQueryObj)
        : undefined;
    },

    initialPageParam: param as any,
  };

  const getLengthOfList = useCallback(
    (infiniteData: InfiniteData<any> | undefined): number => {
      return (
        infiniteData?.pages?.flatMap((unitInfo: any) =>
          (unitInfo?.data?.results ?? []).map(() => 0)
        )?.length ?? 0
      );
    },
    []
  );

  const {
    infiniteData,
    handleScroll,
    // refetch,
    // isLoading: infiniteIsLoading,
  } = useInfiniteScrollQuery<any, Error, any>({
    options,
    limit,
    getLengthOfList,
  });

  const subscribersData = infiniteData?.pages?.flatMap((subscriber: any) =>
    subscriber?.data?.results?.map((item: any) => item)
  );
  console.log({ infiniteData });
  if (!isValidElement(children)) {
    return <>{children}</>;
  }

  const childElement = children as ReactElement<any>;

  const CloneChild = cloneElement(childElement, {
    onClick: () => {
      onOpen();
    },
    role: "button",
  });
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      {CloneChild}
      <Drawer
        placement={isMobile ? "bottom" : "right"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />
        <DrawerContent
          position="relative"
          zIndex={100}
          mt="65.12px"
          minW={{ base: "full", md: "400px" }}
          bg="#fff"
          minH={{ base: "50%", md: "initial" }}
          borderTopRadius={{ base: "xl", md: "none" }}
          p="0px"
        >
          <HStack
            pt={{ base: "33.5px", md: "41.5px" }}
            pb="17.5px"
            h="80px"
            px="24px"
            justify="space-between"
            align="center"
            position="relative"
          >
            <Heading
              fontSize={{ base: "24px", md: "32px" }}
              fontWeight="600"
              color="#18181B"
              lineHeight="21px"
              letterSpacing="-2%"
            >
              Subscribers
            </Heading>
            <HStack align="center" justify="space-between">
              <HStack spacing="15px">
                <VStack
                  position="relative"
                  justify="center"
                  align="center"
                  w="30px"
                  h="30px"
                  borderRadius="5px"
                  transition="0.3s ease-in-out"
                  _hover={{
                    width: "30px",
                    height: "30px",
                  }}
                >
                  <DrawerCloseButton
                    right="0px"
                    left="0px"
                    my="auto"
                    color="#000"
                    top="0"
                    bottom="0"
                  />
                </VStack>
              </HStack>
            </HStack>
          </HStack>
          <DrawerBody
            sx={customScrollbarStyles}
            p="24px"
            pl="24px"
            pr="20.5px"
            mr="7px"
            onScroll={handleScroll}
          >
            <Stack w="full" gap="40px">
              {subscribersData?.length
                ? subscribersData.map((subscriber, idx) => (
                    <HStack key={idx} spacing="12px">
                      <Avatar
                        src={subscriber?.avatar}
                        name={`${subscriber?.first_name} ${subscriber?.last_name}`}
                        boxSize="48px"
                        minW="48px"
                      />
                      <Stack spacing="4px">
                        <Text
                          fontWeight="500"
                          fontSize="16px"
                          lineHeight="21px"
                          letterSpacing="-1.1%"
                          color="#27272A"
                        >
                          {`${subscriber?.first_name} ${subscriber?.last_name}`}
                        </Text>
                        <Text
                          fontWeight="500"
                          fontSize="14px"
                          lineHeight="15px"
                          letterSpacing="-1.1%"
                          color="#52525B"
                        >
                          {subscriber?.unit_purchases?.[0]?.unit_title}
                        </Text>
                      </Stack>
                    </HStack>
                  ))
                : null}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SubscribersDrawer;
