import { Box, useTheme } from "@chakra-ui/react";
import { get } from "@chakra-ui/utils";
import { assetsInstance } from "./types";

export const FileTextIcon = ({
  baseColor = "#116932",
  ...rest
}: assetsInstance) => {
  const theme = useTheme();
  const svgFillColor = get(theme.colors, baseColor, "#116932");
  return (
    <Box w="21px" h="21px" {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.4062 18.375H4.59375C4.4197 18.375 4.25278 18.3059 4.12971 18.1828C4.00664 18.0597 3.9375 17.8928 3.9375 17.7188V3.28125C3.9375 3.1072 4.00664 2.94028 4.12971 2.81721C4.25278 2.69414 4.4197 2.625 4.59375 2.625H12.4688L17.0625 7.21875V17.7188C17.0625 17.8928 16.9934 18.0597 16.8703 18.1828C16.7472 18.3059 16.5803 18.375 16.4062 18.375Z"
          stroke={svgFillColor}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.4688 2.625V7.21875H17.0625"
          stroke={svgFillColor}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.875 11.1562H13.125"
          stroke={svgFillColor}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.875 13.7812H13.125"
          stroke={svgFillColor}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Box>
  );
};
