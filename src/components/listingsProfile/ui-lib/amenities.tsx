import { Flex, HStack, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { listingDetailsProps } from "../types";
import AMENITIES_STORE, {
  ALL_AMENITIES_STORES,
  findAmenityByName,
} from "@/constants/listing/amenities";

const Amenities = ({
  amenities,
}: {
  amenities: listingDetailsProps["amenities"];
}) => {
  return amenities?.length ? (
    <Stack as="section" spacing="24px">
      <Text
        as="h2"
        fontSize={{ base: "18px", md: "24px" }}
        fontWeight="600"
        color="#000000
"
        lineHeight="100%"
        letterSpacing="-2%"
      >
        Amenities
      </Text>
      <Flex maxH="152px" h="full" gap="24px" flexWrap="wrap">
        {amenities.map((amenity, index) => (
          <HStack w="fit-content" key={index} spacing="8px">
            {/* <Image
              alt={`${amenity.name} icon`}
              src={`${
                findAmenityByName(amenity?.name ?? "", ALL_AMENITIES_STORES)
                  ?.icon?.src
              }`}
              boxSize="20px"
              fontSize="9px"
            /> */}
            <Text
              fontWeight="400"
              fontSize="16px"
              lineHeight="140%"
              letterSpacing="0%"
            >
              {amenity.name}
            </Text>
          </HStack>
        ))}
      </Flex>
    </Stack>
  ) : null;
};

export default Amenities;
