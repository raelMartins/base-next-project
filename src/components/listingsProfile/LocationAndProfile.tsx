import {
  Box,
  Flex,
  HStack,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import React from "react";
import ContactPerson from "./ui-lib/contactPerson";
import Subscribers from "./ui-lib/subscribers";
import { PriceHeader } from "./ui-lib/priceHeader";
import { listingDetailsProps } from "./types";
import { LandmarkAndMap } from "./ui-lib/map/mapAndLandmark";

const LocationAndProfile = ({
  listingDetails,
}: {
  listingDetails: listingDetailsProps;
}) => {
  return (
    <Stack
      p="24px"
      spacing="24px"
      minH="450px"
      flex="1.5"
      //   bg="pink"
      borderLeft="0.5px solid #D4D4D8"
      maxW="521px"
      minW="500px"
      display={{ base: "none", xl: "flex" }}
      // divider={<StackDivider borderBottom="0.5px solid #D4D4D8 !important" />}
    >
      <PriceHeader details={listingDetails} />
      <LandmarkAndMap
        address={listingDetails?.address}
        lat={listingDetails?.latitude}
        lng={listingDetails?.longitude}
      />
      <ContactPerson listing_id={listingDetails?.id} />
      <Subscribers listing_id={listingDetails?.id} />
    </Stack>
  );
};

export default LocationAndProfile;
