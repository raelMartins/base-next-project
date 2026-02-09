"use client";

import { Center, Text, VStack } from "@chakra-ui/react";

export default function ReferralsIndexPage() {
  return (
    <Center minH="50vh">
      <VStack gap={4}>
        <Text fontWeight={600} fontSize="lg">
          Referrals
        </Text>
        <Text color="gray.600">
          Open the menu and select a referral from the drawer to view details.
        </Text>
      </VStack>
    </Center>
  );
}
