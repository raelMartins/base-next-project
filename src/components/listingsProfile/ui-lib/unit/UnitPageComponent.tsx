import { Flex, HStack, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import ImageContainer from "../../ImageContainer";
import { UnitInfo } from "./unitInfo";
import FinanceAndFees from "./financeAndFees";
import { useQuery } from "@tanstack/react-query";
import { fetchPaymentPlansForUnit } from "@/api/listings";
import { CloseContainedIcon } from "@/components/assets/listings/close_contained";

export const UnitPageComponent = ({
  unit_id,
  closeModal,
}: {
  closeModal?: (e: React.MouseEvent<HTMLElement>) => void;
  unit_id: string;
}) => {
  const UNIT_QUERY = useQuery({
    queryKey: ["unit info payment_plan", unit_id],
    queryFn: () => fetchPaymentPlansForUnit(unit_id),
    enabled: !!unit_id,
  });
  const PAYMENT_PLAN_DATA = UNIT_QUERY.data
    ? UNIT_QUERY.data?.data?.results ?? []
    : [];
  const UNIT_INFO = UNIT_QUERY.data
    ? UNIT_QUERY.data?.data?.results[0]?.bundle ?? []
    : [];

  const images = UNIT_INFO?.photos
    ? UNIT_INFO?.photos?.map((item: any) => ({
        url: item?.photo || item,
        name: `${UNIT_INFO?.unit_title}'s image`,
        type: "image",
      }))
    : [];
  console.log({ images, UNIT_QUERY, PAYMENT_PLAN_DATA, UNIT_INFO });

  return (
    <Stack
      w={`100%`}
      p={{ base: `0px`, xl: "40px" }}
      gap={{ base: `16px`, xl: "20px" }}
    >
      <HStack
        display={{ base: "none", xl: "flex" }}
        justify="space-between"
        w="full"
      >
        <Heading
          fontSize="36px "
          fontWeight="600"
          color="#191919"
          letterSpacing="-2%"
          lineHeight="100%"
          w="fit-content"
        >
          {UNIT_INFO?.unit_title}
        </Heading>
        <CloseContainedIcon
          h="48px"
          w="48px"
          cursor="pointer"
          onClick={closeModal ? closeModal : undefined}
          display={{ base: "none", md: "inline-block" }}
        />
      </HStack>
      <Stack spacing={{ base: "24px", xl: "32px" }} w="full">
        <ImageContainer isLoading={UNIT_QUERY.isLoading} listOfMedia={images} />
        <Flex
          flexDirection={{ base: "column", xl: "row" }}
          border={{ base: "none", xl: "0.5px solid #D4D4D8" }}
          px={{ base: "20px", xl: "0px" }}
          borderRight="none !important"
          borderLeft="none !important"
        >
          <UnitInfo
            PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
            unitInfo={UNIT_INFO}
          />
          <FinanceAndFees unitInfo={UNIT_INFO} />
          {/* <LocationAndProfile /> */}
        </Flex>
      </Stack>
    </Stack>
  );
};
