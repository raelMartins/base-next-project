import { Box, Flex, Text } from '@chakra-ui/react';

export const FOOTER_HEIGHT = '50px';

export const Footer = ({}) => {
  return (
    <Box
      position={`sticky`}
      bottom={`0px`}
      left={`0px`}
      right={`0px`}
      transition={`.5s`}
      zIndex={`2`}
    >
      <Flex
        w={`100%`}
        justify={`space-between`}
        align={`center`}
        p={{ base: `12px 16px`, md: `12px 42px` }}
        borderTop={`1px solid`}
        borderColor={`#E4E4E7`}
        color={`#71717A`}
        bg={'#ffffff'}
      >
        <Text>Powered by Myxellia</Text>
      </Flex>
    </Box>
  );
};
