import { getAllContactPersons } from "@/api/listings";
import { Avatar, HStack, Stack, StackDivider, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { contactPersonProps } from "../types";

import { PhoneIcon } from "../../assets/listings/Phone";

const ContactPerson = ({ listing_id }: { listing_id: string }) => {
  const ALL_CONTACT_PERSONS_QUERY = useQuery({
    queryKey: ["getAllContactPersons", listing_id],
    queryFn: () => getAllContactPersons(listing_id),
  });
  const contacts: contactPersonProps[] =
    ALL_CONTACT_PERSONS_QUERY?.data?.data?.results;
  console.log({ len: contacts?.length, contacts });
  return (
    <Stack
      display={{ base: "none", md: contacts?.length ? "flex" : "none" }}
      spacing="24px"
    >
      <StackDivider borderBottom="0.5px solid #D4D4D8 !important" />
      <HStack>
        <PhoneIcon />
        <Text
          as="h2"
          fontWeight="600"
          fontSize="16px"
          lineHeight="24px"
          letterSpacing="-1%"
          color="#1A1A1A"
        >
          Contact Person
        </Text>
      </HStack>
      {contacts?.length ? (
        <Stack spacing="32px">
          {contacts?.map((contact, idx) => (
            <HStack key={idx} spacing="12px">
              <Avatar
                src={contact?.image}
                name={contact?.name}
                boxSize="40px"
                minW="40px"
              />
              <Stack spacing="4px">
                <Text
                  fontWeight="500"
                  fontSize="16px"
                  lineHeight="100%"
                  letterSpacing="-1%"
                  color="#27272A"
                >
                  {contact?.name}
                </Text>
                <Text
                  fontWeight="400"
                  fontSize="13px"
                  lineHeight="100%"
                  letterSpacing="-1%"
                  color="#3F3F46"
                >
                  {contact?.phone_number}
                </Text>
              </Stack>
            </HStack>
          ))}
        </Stack>
      ) : null}
    </Stack>
  );
};

export default ContactPerson;

// const ContactPersonComponent = () => {
//   return (
//     <HStack spacing="12px">
//       <Avatar src={undefined} name="" boxSize="40px" minW="40px" />
//       <Stack spacing="4px">
//         <Text
//           fontWeight="500"
//           fontSize="16px"
//           lineHeight="100%"
//           letterSpacing="-1%"
//           color="#27272A"
//         >
//           Dalope Ayomud
//         </Text>
//         <Text
//           fontWeight="400"
//           fontSize="13px"
//           lineHeight="100%"
//           letterSpacing="-1%"
//           color="#3F3F46"
//         >
//           +234 901 920 2910
//         </Text>
//       </Stack>
//     </HStack>
//   );
// };
