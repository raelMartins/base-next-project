import React from "react";
import { Avatar, HStack, Stack, StackProps, Text } from "@chakra-ui/react";
import { formatToCurrency } from "@veerge/utils";
import { ReceiptIcon } from "@/components/assets/listings/Receipt";
import { WalletContainedMultiColored } from "@/components/assets/listings/walletContainer_multicolor";
import { DollarContainedIcon } from "@/components/assets/listings/dollar_contained_Icon";

interface closingCostProps extends StackProps {
  fees: { name: string; amount: string }[];
}
export const ClosingCost = ({ fees, ...rest }: closingCostProps) => {
  console.log({ fees });
  return (
    <Stack spacing="24px" display={fees?.length ? "flex" : "none"} {...rest}>
      <HStack>
        <ReceiptIcon />
        <Text
          as="h2"
          fontWeight="600"
          fontSize="16px"
          lineHeight="24px"
          letterSpacing="-1%"
          color="#1A1A1A"
        >
          Closing Cost
        </Text>
      </HStack>
      <Stack spacing="32px">
        {fees.map((fee, idx) => (
          <ClosingCostComponent fee={fee} key={idx} />
        ))}
      </Stack>
    </Stack>
  );
};

const ClosingCostComponent = ({ fee }: any) => {
  return (
    <HStack spacing="12px">
      <DollarContainedIcon />
      <Stack spacing="4px">
        <Text
          fontWeight="500"
          fontSize="16px"
          lineHeight="100%"
          letterSpacing="-1%"
          color="#27272A"
        >
          {fee?.name ?? ""}
        </Text>
        <Text
          fontWeight="400"
          fontSize="13px"
          lineHeight="100%"
          letterSpacing="-1%"
          color="#3F3F46"
        >
          {formatToCurrency({ amount: fee?.amount })}
        </Text>
      </Stack>
    </HStack>
  );
};
