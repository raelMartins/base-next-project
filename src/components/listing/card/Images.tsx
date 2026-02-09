import { Box } from "@chakra-ui/react";
import Image from "next/image";

export default function ListingCardImages({ images }: { images?: string[] }) {
  return (
    <Box
      width="100%"
      maxWidth={{ xl: "220px", base: "none" }}
      display="grid"
      gridTemplateColumns={`repeat(${Math.max(1, Number(images?.length))}, 100%)`}
      flex="1"
      minHeight="200px"
      position="relative"
      overflowX="auto"
      css={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {images?.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          objectFit="cover"
          fill
        />
      ))}
    </Box>
  );
}
