import {
  Box,
  HStack,
  Image,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import PaymentPlanSummary from "./paymentPlanSummary";
import { formatToCurrency } from "@veerge/utils";
import { WalletContainedMultiColored } from "@/components/assets/listings/walletContainer_multicolor";
import { CaretRightIcon } from "@/components/assets/listings/CaretRight";

export const PaymentPlan = ({ PAYMENT_PLAN_DATA, hasPaymentPlan }: any) => {
  return (
    <Stack
      display={hasPaymentPlan && PAYMENT_PLAN_DATA?.length ? "flex" : "none"}
      as="section"
      spacing="20px"
    >
      <Text
        as="h2"
        fontSize={{ base: "18px", md: "24px" }}
        fontWeight="600"
        color="#000000"
        lineHeight="100%"
        letterSpacing="-2%"
      >
        Payment Plan
      </Text>
      <Stack
        spacing="20px"
        divider={<StackDivider borderBottom="0.5px solid #D4D4D8 !important" />}
      >
        {PAYMENT_PLAN_DATA.map((item: any, idx: any) => (
          <PaymentPlanListComponent plan={item} key={idx} />
        ))}
      </Stack>
    </Stack>
  );
};

const PaymentPlanListComponent = ({ plan }: any) => {
  const modalDisclosure = useDisclosure();

  return (
    <PaymentPlanSummary selectedPlan={plan} modalDisclosure={modalDisclosure}>
      <HStack justify="space-between">
        <HStack spacing="12px">
          <WalletContainedMultiColored />
          <Stack>
            <Text
              fontSize="16px"
              fontWeight="500"
              lineHeight="21px"
              letterSpacing="-2%"
              color="#27272A"
            >
              {`${plan?.payment_period_in_months} month${
                plan?.payment_period_in_months > 1 ? "s" : ""
              } Plan`}
            </Text>
            <HStack spacing="4px">
              <Text
                fontSize={{ base: "12px", md: "13px" }}
                fontWeight="500"
                lineHeight="150%"
                letterSpacing="2%"
                color="#52525B"
              >
                {formatToCurrency({ amount: plan?.initial_deposit_in_value })} initial
                Deposit
              </Text>
            </HStack>
          </Stack>
        </HStack>
        <HStack
          alignSelf={{ base: "start", md: "center" }}
          spacing="10px"
          pr="10px"
        >
          <Text
            fontSize={{ base: "16px", md: "20px" }}
            fontWeight="600"
            lineHeight="20px"
            letterSpacing="-1%"
            color="#27272A"
          >
            {formatToCurrency({ amount: plan?.purchase_price })}
          </Text>
          <CaretRightIcon />
        </HStack>
      </HStack>
    </PaymentPlanSummary>
  );
};
