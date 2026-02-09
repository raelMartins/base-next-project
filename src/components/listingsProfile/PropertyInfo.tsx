import { Box, Flex, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import AboutThisProperty from "./ui-lib/aboutthisProperty";
import Amenities from "./ui-lib/amenities";
import Units from "./ui-lib/units";
import Subscribers from "./ui-lib/subscribers";
import { PriceHeader } from "./ui-lib/priceHeader";
import { ClosingCost } from "./ui-lib/unit/closingCost";
import { listingDetailsProps } from "./types";
import Esub from "./utils/esub";
import { MapPin } from "../assets/listings/MapPin";

const PropertyInfo = ({
  listingDetails,
}: {
  listingDetails: listingDetailsProps;
}) => {
  const descriptionList = [
    ...(listingDetails?.start_period || listingDetails?.start_year
      ? [
          {
            label: "Start Date",
            value: `${listingDetails?.start_period} ${listingDetails?.start_year}`,
          },
        ]
      : []),
    ...(listingDetails?.end_period || listingDetails?.end_year
      ? [
          {
            label: "Estimated Completion Date",
            value: `${listingDetails?.end_period} ${listingDetails?.end_year}`,
          },
        ]
      : []),
    ...(listingDetails?.building_type
      ? [
          {
            label: "Project Type",
            value: listingDetails?.building_type ?? "-",
          },
        ]
      : []),
    ...(listingDetails?.land_title
      ? [
          {
            label: "Land Title",
            value: listingDetails?.land_title ?? "-",
          },
        ]
      : []),

    ...(listingDetails?.land_size
      ? [
          {
            label: "Building Size",
            value: listingDetails?.land_size ?? "-",
          },
        ]
      : []),

    ...(listingDetails?.purchase_url
      ? [
          {
            label: "E-subscription",
            component: <Esub purchaseURL={listingDetails?.purchase_url} />,
          },
        ]
      : []),
  ];
  return (
    <Stack
      p={{ base: "0px 0px 16px", xl: "24px 0px 16px" }}
      flex="2.9"
      spacing={{ base: "32px", xl: "48px" }}
      minH="450px"
      pr={{ base: "0px", xl: "25px" }}
      // bg="blue.700"
    >
      <Stack spacing="4px">
        <Heading
          fontSize="36px "
          fontWeight="600"
          color="#191919"
          letterSpacing="-2%"
          lineHeight="100%"
        >
          {listingDetails?.name ?? "-"}
        </Heading>
        {listingDetails?.address ? (
          <Flex gap={{ base: "5px", md: "10px" }}>
            <MapPin h={{ base: "18px", md: "24px" }} />
            <Text
              textDecor="underline"
              fontSize="16px"
              fontWeight="500"
              lineHeight="100%"
              letterSpacing="-1.1%"
              color="#116932"
            >
              {listingDetails?.address ?? ""}
            </Text>
          </Flex>
        ) : null}
      </Stack>
      <PriceHeader
        details={listingDetails}
        borderTop="0.5px solid #D4D4D8"
        borderBottom="0.5px solid #D4D4D8"
        display={{ base: "flex", xl: "none" }}
        py="16px"
      />
      <AboutThisProperty
        description={listingDetails?.description}
        descriptionList={descriptionList}
      />
      <Amenities amenities={listingDetails?.amenities} />
      <Box display={{ base: "initial", xl: "none" }}>
        <Subscribers listing_id={listingDetails?.id ?? ""} />
      </Box>

      <Units listing_id={listingDetails?.id ?? ""} />
    </Stack>
  );
};

export default PropertyInfo;
