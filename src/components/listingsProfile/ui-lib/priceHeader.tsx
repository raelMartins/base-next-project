import { Box, HStack, Stack, StackProps, Text } from "@chakra-ui/react";
import React from "react";
import { listingDetailsProps } from "../types";
import { FormatToColorfulCurrency } from "@/utils/functions/formatAmount";
import { formatNumberWithCommas } from "@veerge/utils";

interface PriceHeaderProps extends StackProps {
  details: listingDetailsProps;
}

export const PriceHeader = ({ details, ...rest }: PriceHeaderProps) => {
  const isBuildingTypeSingleFamilyResidential =
    details?.building_type == "Detached" ||
    details?.building_type == "Semi Detached";
  const isSoldOut =
    typeof details?.units_available === "number" &&
    details.units_available === 0;
  return (
    <Stack spacing="8px" {...rest}>
      <Stack spacing="3px">
        <Text
          fontSize="14px"
          fontWeight="400"
          lineHeight="100%"
          letterSpacing="0%"
          color="#606060"
        >
          {`${isBuildingTypeSingleFamilyResidential ? "" : "Starting"} Price`}
        </Text>

        {isSoldOut ? (
          <Text
            fontSize="36px"
            fontWeight={600}
            lineHeight="100%"
            letterSpacing="-2%"
            color="#116932"
          >
            Sold Out
          </Text>
        ) : (
          <FormatToColorfulCurrency
            amount={details?.starting_from}
            fontSize="36px"
            fontWeight={600}
            color="#116932"
            decimalStyle={{
              color: "#919191",
            }}
            wrapper={{ justifyContent: "start" }}
          />
        )}
      </Stack>

      <HStack spacing="10px">
        {details?.payment_plan_is_available ? (
          <HStack spacing="6px">
            <Box boxSize="10px" bg="#16A34A" rounded="full" minW="10px" />

            <Text
              fontWeight=" 500"
              fontSize=" 14px"
              lineHeight=" 100%"
              letterSpacing=" -1%"
            >
              Payment Plan Available
            </Text>
          </HStack>
        ) : null}
        {!isSoldOut && details?.external_commission_rate ? (
          <>
            <Box boxSize="4px" bg="#3F3F46" rounded="full" minW="4px" />
            <Text
              fontWeight=" 500"
              fontSize=" 14px"
              lineHeight=" 100%"
              letterSpacing=" -1%"
            >
              {`${formatNumberWithCommas(
                Number(details?.external_commission_rate)?.toFixed(2)
              )}% Commission`}
            </Text>
          </>
        ) : null}
      </HStack>
    </Stack>
  );
};

export const UnitPriceHeader = ({ details, ...rest }: any) => {
  const isSoldOut =
    typeof details?.quantity === "number" && details.quantity === 0;
  return (
    <Stack spacing="8px" {...rest}>
      <Stack spacing="3px">
        <Text
          fontSize="14px"
          fontWeight="400"
          lineHeight="100%"
          letterSpacing="0%"
          color="#606060"
        >
          Price
        </Text>

        {isSoldOut ? (
          <Text
            fontSize="36px"
            fontWeight={600}
            lineHeight="100%"
            letterSpacing="-2%"
            color="#116932"
          >
            Sold Out
          </Text>
        ) : (
          <FormatToColorfulCurrency
            amount={details?.price}
            fontSize="36px"
            fontWeight={600}
            color="#116932"
            decimalStyle={{
              color: "#919191",
            }}
            wrapper={{ justifyContent: "start" }}
          />
        )}
      </Stack>

      <HStack spacing="10px">
        {details?.payment_plan_is_available ? (
          <HStack spacing="6px">
            <Box boxSize="10px" bg="#16A34A" rounded="full" minW="10px" />

            <Text
              fontWeight=" 500"
              fontSize=" 14px"
              lineHeight=" 100%"
              letterSpacing=" -1%"
            >
              Payment Plan Available
            </Text>
          </HStack>
        ) : null}
      </HStack>
    </Stack>
  );
};
