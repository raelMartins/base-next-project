import {
  Box,
  HStack,
  Image,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { UnitModal } from "./unit";
import useInfiniteScrollQuery from "@/utils/hooks/useInfiniteScrollQuery";
import { InfiniteData } from "@tanstack/react-query";
import { fetchListingBundles } from "@/api/listings";
import {
  convertToQuery,
  parseSearchParamsToObject,
} from "@/utils/functions/convertToQuery";
import { useSearchParams } from "next/navigation";
import { hideScrollBar } from "@/utils/scrollbar/hideScrollBar";
import { customScrollbarStyles } from "@/utils/scrollbar/customScrollStyle";
import { formatNumberWithCommas, formatToCurrency } from "@veerge/utils";
import { WalletConntainerIcon } from "../../assets/listings/walletContainerIcon";
import { CaretRightIcon } from "../../assets/listings/CaretRight";
const limit = 10;
const Units = ({ listing_id }: { listing_id: string }) => {
  const searchParams = useSearchParams();

  const paramObj = {
    page: 1,
    limit,
    project_id: listing_id,
    ...parseSearchParamsToObject(searchParams),
  };

  const param = convertToQuery(paramObj);
  const options = {
    queryKey: ["unit page", param, limit] as any,
    queryFn: ({ pageParam = param as any }) => {
      return fetchListingBundles(pageParam);
    },
    // initialData: {
    //   pages: [{data: projects}],
    //   pageParams: [param],
    // },
    getNextPageParam: (lastPage: any, allPages: InfiniteData<any>["pages"]) => {
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

  const unitData = infiniteData?.pages?.flatMap((projectsPage: any) =>
    projectsPage?.data?.results?.map((item: any) => item)
  );

  console.log({ infiniteData, unitData });
  return unitData?.length ? (
    <Stack as="section" spacing="20px">
      <Text
        as="h2"
        fontSize={{ base: "18px", md: "24px" }}
        fontWeight="600"
        color="#000000"
        lineHeight="100%"
        letterSpacing="-2%"
      >
        Units
      </Text>
      <Stack maxH="450px" pr="10px" onScroll={handleScroll} overflowY="auto">
        <Stack
          spacing="20px"
          divider={
            <StackDivider borderBottom="0.5px solid #D4D4D8 !important" />
          }
          sx={customScrollbarStyles}
        >
          {unitData.map((item, idx) => (
            <UnitListComponent unit={item} key={idx} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  ) : null;
};

export default Units;

const UnitListComponent = ({ unit }: { unit: any }) => {
  return (
    <UnitModal unitId={unit?.id}>
      <HStack justify="space-between">
        <HStack spacing="12px">
          <Image
            src={unit?.photos?.[0]?.photo ?? ""}
            alt={`unit image`}
            boxSize="60px"
            objectFit="cover"
            rounded="4px"
            minW="60px"
          />
          <Stack>
            <Text
              fontSize={{ base: "16px", xl: "20px" }}
              fontWeight="600"
              lineHeight="24px"
              letterSpacing="-2%"
              color="#1A1A1A"
            >
              {unit?.unit_title ?? "-"}
            </Text>
            <HStack spacing="4px" flexWrap="wrap">
              {/* <HStack spacing="4px">
                <WalletConntainerIcon />
                <Text
                  fontSize="13px"
                  fontWeight="500"
                  lineHeight="20px"
                  letterSpacing="-1.1%"
                  color="#116932"
                  textDecor="underline"
                >
                  Payment Plan Available
                </Text>
              </HStack> */}
              {unit?.quantity > 2 ? null : (
                <HStack spacing="4px" flexWrap="nowrap">
                  <Box
                    boxSize="4px"
                    bg={unit?.quantity > 2 ? "#919191" : "#DC2626"}
                    rounded="full"
                    minW="4px"
                  />

                  <Text
                    fontSize="13px"
                    fontWeight="500"
                    lineHeight="20px"
                    letterSpacing="-1.1%"
                    color={unit?.quantity > 2 ? "#919191" : "#DC2626"}
                  >
                    {unit?.quantity === 0
                      ? "Sold out"
                      : `${formatNumberWithCommas(unit?.quantity)} unit${
                          unit?.quantity === 1 ? "" : "s"
                        } left`}
                  </Text>
                </HStack>
              )}
            </HStack>
          </Stack>
        </HStack>
        <HStack spacing="10px" pr="10px">
          <Text
            fontSize={{ base: "13px", xl: "20px" }}
            fontWeight="600"
            lineHeight="20px"
            letterSpacing="-1%"
            color="#27272A"
          >
            {unit?.quantity === 0
              ? "Sold Out"
              : formatToCurrency({ amount: unit?.price })}
          </Text>
          <CaretRightIcon />
        </HStack>
      </HStack>
    </UnitModal>
  );
};
