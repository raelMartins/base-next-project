import React, { ReactElement, cloneElement, isValidElement } from "react";
import Morph from "../../utils/morphedComponent";
import {
  Grid,
  HStack,
  Link,
  Stack,
  Text,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { fetchCustomPlanSummary } from "@/api/listings";
import { formatToCurrency } from "@veerge/utils";
import { getOrdinal } from "@/utils/functions/ordinals";
import { FileTextIcon } from "@/components/assets/listings/FileText";

const PaymentPlanSummary = ({
  modalDisclosure,
  selectedPlan,
  children,
}: {
  modalDisclosure: UseDisclosureReturn;
  selectedPlan: any;
  children: React.ReactNode;
}) => {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["customPLansummary", selectedPlan?.id],
    queryFn: () => fetchCustomPlanSummary(selectedPlan?.id ?? ""),
    enabled: !!selectedPlan?.id,
  });
  if (!isValidElement(children)) {
    return <>{children}</>;
  }

  const planBreakdown = data?.data?.data?.length
    ? data?.data?.data?.map((item: any, idx: number) => ({
        label: `${getOrdinal(idx + 1)} Instalment`,
        value: item?.amount ? formatToCurrency({ amount: item?.amount }) : "-",
      }))
    : [];

  const childElement = children as ReactElement<any>;
  const CloneChild = cloneElement(childElement, {
    cursor: "pointer",
    onClick: () => {
      modalDisclosure.onOpen();
      console.log("cll");
    },
    role: "button",
  });
  const breakdown = [
    {
      label: "Purchase Price",
      value: selectedPlan?.purchase_price
        ? formatToCurrency({ amount: selectedPlan?.purchase_price })
        : "-",
    },
    {
      label: "Initial Deposit",
      value: formatToCurrency({ amount: selectedPlan?.initial_deposit_in_value }),
    },
    ...planBreakdown,
    {
      label: "Document",
      component: (
        <Link
          href={`${
            selectedPlan?.contract?.length ? selectedPlan?.contract?.[0] : ""
          }`}
          display="flex"
          gap="4px"
          color="#116932"
          fontWeight=" 600"
          fontSize="18px"
          lineHeight="21px"
          letterSpacing="-2%"
          alignItems="center"
          isExternal
        >
          <FileTextIcon />
          Payment Agreement.pdf
        </Link>
      ),
    },
  ];
  return (
    <>
      {CloneChild}
      <Morph
        autoFocus={false}
        isOpen={modalDisclosure.isOpen}
        onClose={modalDisclosure.onClose}
        isCentered
      >
        <Morph.Overlay backdropFilter="blur(4px)" />
        <Morph.Content
          // This will apply "0" border radius on mobile (base)
          // and "xl" on desktop (md/lg)
          borderRadius={{ base: "none", md: "xl" }}
          minW={{ base: "full", md: "600px" }}
          maxH={{ base: "50%", md: "550px" }}
          rounded="16px"
          roundedBottom={{ base: "none", md: "16px" }}
          bg={"white"}
        >
          <HStack
            p={{ base: "33.5px 20px", md: "45.5px 32px" }}
            justify="space-between"
          >
            <Morph.Header
              fontSize={{ base: "lg", md: "32px" }}
              fontWeight={600}
              lineHeight="21px"
              letterSpacing="-2%"
              flex="2"
              p="0px"
            >
              {`${selectedPlan?.payment_period_in_months} month${
                selectedPlan?.payment_period_in_months > 1 ? "s" : ""
              } Plan`}
            </Morph.Header>
            <Morph.CloseButton pos="initial" />
          </HStack>

          <Morph.Body px={{ base: "20px", md: "32px" }} py="0px" pb="45.5px">
            <Grid
              rowGap={"32px"}
              columnGap={{ base: "0px", md: "16px" }}
              gridTemplateColumns={{ base: "1fr", md: "repeat(2,1fr)" }}
            >
              {breakdown.map((item, idx) => (
                <Stack
                  spacing="6px"
                  borderRight={{
                    base: "0px",
                    md:
                      idx % 2 == 0 && breakdown?.length - 1 !== idx
                        ? "0.5px solid #D4D4D8"
                        : "none",
                  }}
                >
                  <Text
                    fontWeight="500"
                    fontSize="14px"
                    lineHeight="150%"
                    letterSpacing="2%"
                    color="#52525B"
                  >
                    {item.label}
                  </Text>
                  {item.value ? (
                    <Text
                      fontWeight="600"
                      fontSize="18px"
                      lineHeight="21px"
                      letterSpacing="-2%"
                      color="#18181B"
                    >
                      {item.value}
                    </Text>
                  ) : (
                    item.component
                  )}
                </Stack>
              ))}
            </Grid>
          </Morph.Body>
        </Morph.Content>
      </Morph>
    </>
  );
};

export default PaymentPlanSummary;
