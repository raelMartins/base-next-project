import { Avatar, Center, Text, Tooltip, VStack } from '@chakra-ui/react';

export const ProfileMenu = ({ realtor }: { realtor: any }) => {
  return (
    <>
      <Tooltip
        background={`#000`}
        borderRadius={`4px`}
        padding={`3px 6px`}
        hasArrow
        placement='left'
        label={
          <VStack gap={`2px`} textAlign={`center`}>
            <Text
              fontSize={`11px`}
              fontWeight={`500px`}
              textTransform={`uppercase`}
            >{`${realtor?.first_name} ${realtor?.last_name}`}</Text>
            <Text fontSize={`9px`}>{realtor?.email}</Text>
          </VStack>
        }
      >
        <Center cursor={`pointer`}>
          <Avatar
            src={realtor?.avatar}
            name={`${realtor?.first_name} ${realtor?.last_name}`}
            boxSize={`40px`}
          />
        </Center>
      </Tooltip>
    </>
  );
};
