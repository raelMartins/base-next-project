import { HStack, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import AboutThisProperty from "../aboutthisProperty";
import { PaymentPlan } from "./paymentPlan";
import { PriceHeader, UnitPriceHeader } from "../priceHeader";
import { ClosingCost } from "./closingCost";
import Esub from "../../utils/esub";
import { formatNumberWithCommas } from "@veerge/utils";

export const UnitInfo = ({ unitInfo, PAYMENT_PLAN_DATA }: any) => {
  const descriptionList = [
    ...(unitInfo?.unit_size
      ? [
          {
            label: "Unit Size",
            value: formatNumberWithCommas(unitInfo?.unit_size ?? ""),
          },
        ]
      : []),

    ...(unitInfo?.no_of_bedrooms
      ? [
          {
            label: "No. of Bedroom",
            value: unitInfo?.no_of_bedrooms ?? "-",
          },
        ]
      : []),
    ...(unitInfo?.has_allocations
      ? [
          {
            label: "Allocation Milestone",
            value: `${unitInfo?.allocation_milestone}%`,
          },
        ]
      : []),
    ...(unitInfo?.purchase_url
      ? [
          {
            label: "E-Subscription",
            component: <Esub purchaseURL={unitInfo?.purchase_url} />,
          },
        ]
      : []),
  ];
  const hasContract = PAYMENT_PLAN_DATA?.some((item: any) =>
    item.hasOwnProperty("contract")
  );

  return (
    <Stack
      p={{ base: "0px 0px 16px", xl: "24px 0px 16px" }}
      flex="2.9"
      spacing="48px"
      // minH="450px"
      pr={{ base: "0px", xl: "25px" }}
      // bg="blue.700"
    >
      <Heading
        fontSize="36px "
        fontWeight="600"
        color="#191919"
        letterSpacing="-2%"
        lineHeight="100%"
        display={{ base: "initial", xl: "none" }}
      >
        {unitInfo?.unit_title ?? "-"}
      </Heading>
      <UnitPriceHeader
        details={unitInfo}
        borderTop="0.5px solid #D4D4D8"
        borderBottom="0.5px solid #D4D4D8"
        display={{ base: "flex", md: "none" }}
        py="16px"
      />
      <AboutThisProperty
        description={unitInfo?.unit_description ?? ""}
        descriptionList={descriptionList}
      />
      <PaymentPlan
        hasPaymentPlan={hasContract}
        PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
      />
      <ClosingCost
        fees={unitInfo?.fee ?? []}
        display={{ base: "flex", xl: "none" }}
      />
    </Stack>
  );
};
