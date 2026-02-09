import {
  DrawerCloseButton,
  DrawerHeader,
  HStack,
  Text
} from '@chakra-ui/react';

export const CustomDrawerHeader = ({ title }: { title?: string }) => {
  return (
    <DrawerHeader p={`41px 24px 17px`}>
      <HStack justify={`space-between`}>
        <Text fontWeight={`600`} fontSize={`32px`} letterSpacing={`-2%`}>
          {title}
        </Text>
        <DrawerCloseButton position={`static`} />
      </HStack>
    </DrawerHeader>
  );
};
