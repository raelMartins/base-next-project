import { Box, VStack } from "@chakra-ui/react";
import { NextOfKinDetails, BasicDetails } from "./BasicAndNextOfKinDetails";
import { AccountDetails } from "./AccoutDetials";

export default function UserDetails() {
  return (
    <VStack
      flex="1"
      py={{ md: "56px", base: "0" }}
      pl={{ lg: "48px", md: "24px", base: "0" }}
      borderLeft="1px solid"
      borderColor="#E4E4E7"
      display="flex"
      flexDirection="column"
      gap={{ md: "40px", base: "8px" }}
      divider={
        <Box
          as="hr"
          width="100%"
          height="1px"
          border="none"
          outline="none"
          bg="#E4E4E7"
        />
      }
    >
      <BasicDetails />
      <AccountDetails />
      <NextOfKinDetails />
    </VStack>
  );
}
