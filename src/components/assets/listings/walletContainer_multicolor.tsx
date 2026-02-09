import { Box, useTheme } from "@chakra-ui/react";
import { get } from "@chakra-ui/utils";
import { assetsInstance } from "./types";

interface iconPropInstance extends assetsInstance {
  bgColor?: string;
}
export const WalletContainedMultiColored = ({
  baseColor = "#16A34A",
  bgColor = "#DCFCE7",
  ...rest
}: iconPropInstance) => {
  const theme = useTheme();
  const svgFillColor = get(theme.colors, baseColor, "#16A34A");
  const bgSvgFillColor = get(theme.colors, bgColor, "#DCFCE7");
  return (
    <Box w="48px" h="48px" {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="24" fill={bgSvgFillColor} />
        <path
          d="M33.0003 15H15.0003C14.2842 15 13.5975 15.2845 13.0911 15.7908C12.5848 16.2972 12.3003 16.9839 12.3003 17.7V30.3C12.3003 31.0161 12.5848 31.7028 13.0911 32.2092C13.5975 32.7155 14.2842 33 15.0003 33H33.0003C33.7164 33 34.4031 32.7155 34.9095 32.2092C35.4158 31.7028 35.7003 31.0161 35.7003 30.3V17.7C35.7003 16.9839 35.4158 16.2972 34.9095 15.7908C34.4031 15.2845 33.7164 15 33.0003 15ZM26.7003 23.1C26.7003 23.8161 26.4158 24.5028 25.9095 25.0092C25.4031 25.5155 24.7164 25.8 24.0003 25.8C23.2842 25.8 22.5975 25.5155 22.0911 25.0092C21.5848 24.5028 21.3003 23.8161 21.3003 23.1C21.3003 22.8613 21.2055 22.6324 21.0367 22.4636C20.8679 22.2948 20.639 22.2 20.4003 22.2H14.1003V20.4H33.9003V22.2H27.6003C27.3616 22.2 27.1327 22.2948 26.9639 22.4636C26.7951 22.6324 26.7003 22.8613 26.7003 23.1ZM15.0003 16.8H33.0003C33.239 16.8 33.4679 16.8948 33.6367 17.0636C33.8055 17.2324 33.9003 17.4613 33.9003 17.7V18.6H14.1003V17.7C14.1003 17.4613 14.1951 17.2324 14.3639 17.0636C14.5327 16.8948 14.7616 16.8 15.0003 16.8Z"
          fill={svgFillColor}
        />
      </svg>
    </Box>
  );
};
