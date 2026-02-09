import { Box, useTheme } from "@chakra-ui/react";
import { get } from "@chakra-ui/utils";
import { assetsInstance } from "./types";

export const BackIcon = ({ baseColor = "white", ...rest }: assetsInstance) => {
  const theme = useTheme();
  const svgFillColor = get(theme.colors, baseColor, "white");
  return (
    <Box w="48px" h="48px" {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <foreignObject x="-4" y="-4" width="56" height="56">
          <div
            style={{
              backdropFilter: "blur(2px)",
              clipPath: "url(#bgblur_0_127_3078_clip_path)",
              height: "100%",
              width: "100%",
            }}
          ></div>
        </foreignObject>
        <g data-figma-bg-blur-radius="4">
          <rect
            width="48"
            height="48"
            rx="24"
            fill="black"
            fill-opacity="0.3"
          />
          <path
            d="M32.25 24H15.75"
            stroke={svgFillColor}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M22.5 17.25L15.75 24L22.5 30.75"
            stroke={svgFillColor}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="bgblur_0_127_3078_clip_path" transform="translate(4 4)">
            <rect width="48" height="48" rx="24" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
};
