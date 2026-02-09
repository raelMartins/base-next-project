import { Box, useTheme } from "@chakra-ui/react";
import { get } from "@chakra-ui/utils";
import { assetsInstance } from "./types";

export const CopyLinkIcon = ({
  baseColor = "#3636E2",
  ...rest
}: assetsInstance) => {
  const theme = useTheme();
  const svgFillColor = get(theme.colors, baseColor, "#3636E2");
  return (
    <Box w="24px" h="24px" {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.5 12H16.5"
          stroke={svgFillColor}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.75 16.5H6C4.80653 16.5 3.66193 16.0259 2.81802 15.182C1.97411 14.3381 1.5 13.1935 1.5 12C1.5 10.8065 1.97411 9.66193 2.81802 8.81802C3.66193 7.97411 4.80653 7.5 6 7.5H9.75"
          stroke={svgFillColor}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.25 7.5H18C19.1935 7.5 20.3381 7.97411 21.182 8.81802C22.0259 9.66193 22.5 10.8065 22.5 12C22.5 13.1935 22.0259 14.3381 21.182 15.182C20.3381 16.0259 19.1935 16.5 18 16.5H14.25"
          stroke={svgFillColor}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Box>
  );
};
