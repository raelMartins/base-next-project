import { Box, Button, Center, Grid, GridItem, Text } from "@chakra-ui/react";

export const ProfileDetailLayout = ({
  heading,
  buttonText,
  buttonAction,
  children,
}: {
  heading: string;
  buttonText: string;
  buttonAction?: () => void;
  children: React.ReactNode;
}) => (
  <Grid
    width="100%"
    display="grid"
    gridTemplateColumns={{ xl: "auto 1fr", base: "1fr" }}
    gridTemplateRows={{ xl: "auto 1fr", base: "auto auto auto" }}
    rowGap="24px"
    columnGap="40px"
    p={{ md: "0", base: "44px 24px 24px" }}
    borderStyle="solid"
    borderColor="#E4E4E7"
    borderTopWidth="0"
    _first={{ borderTopWidth: { md: "0", base: "1px" } }}
  >
    <GridItem minWidth={{ md: "200px", base: "none" }}>
      <Text
        fontSize="20px"
        fontWeight="600"
        lineHeight="21px"
        letterSpacing="-2%"
        color="#18181B"
      >
        {heading}
      </Text>
    </GridItem>
    <GridItem
      rowSpan={{ xl: 2, base: 1 }}
      width="100%"
      display="flex"
      justifyContent="flex-end"
    >
      <Box width="100%" maxWidth={{ xl: "600px", base: "none" }}>
        {children}
      </Box>
    </GridItem>
    <GridItem minWidth={{ md: "164px", base: "none" }}>
      <Button
        variant="unstyled"
        display="block"
        width={{ xl: "fit-content", base: "100%" }}
        height="fit-content"
        rounded="full"
        border="1px solid"
        borderColor="#E4E4E7"
        color="#3F3F46"
        transition="transform 0.3s ease"
        _hover={{ bg: "rgba(0, 0, 0, 0.1)" }}
        _active={{ transform: "scale(0.9)" }}
        onClick={buttonAction}
      >
        <Center width="100%" height={{ md: "40px", base: "50px" }} px="18px">
          <Text fontSize={{ md: "14px", base: "16px" }} fontWeight="500">
            {buttonText}
          </Text>
        </Center>
      </Button>
    </GridItem>
  </Grid>
);
