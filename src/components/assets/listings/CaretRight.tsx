import { Box, useTheme } from "@chakra-ui/react";
import { get } from "@chakra-ui/utils";
import { assetsInstance } from "./types";

export const CaretRightIcon = ({
  baseColor = "#71717A",
  ...rest
}: assetsInstance) => {
  const theme = useTheme();
  const svgFillColor = get(theme.colors, baseColor, "#71717A");
  return (
    <Box w="20px" h="20px" {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.5 3.75L13.75 10L7.5 16.25"
          stroke={svgFillColor}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Box>
  );
};
