import { Box, Image } from "@chakra-ui/react";
import React, { useEffect } from "react";
// import fallback from '@/images/image-fallBack2.svg';
import { ExpandedImageProps } from "../type";

const zoomStyles = {
  transition: "transform 0.5s ease",
  cursor: "zoom-in",
};

const ExpandedImage = ({
  imageContainerRef,
  imageRef,
  srcObj,
  setIsHovered,
  isHovered,
  currentZoom,
}: ExpandedImageProps) => {
  // zoom listeners
  useEffect(() => {
    const imageContainer = imageContainerRef.current;
    const image = imageRef.current;

    if (!imageContainer || !image || srcObj?.type !== "image") return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isHovered) {
        setIsHovered(false);
      }
      const containerRect = imageContainer.getBoundingClientRect();
      const x = e.clientX - containerRect.left;
      const y = e.clientY - containerRect.top;

      const xPercent = (x / containerRect.width) * 100;
      const yPercent = (y / containerRect.height) * 100;

      image.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    };

    const handleMouseEnter = () => {
      image.style.transform = `scale(${currentZoom})`;
    };

    const handleMouseLeave = () => {
      image.style.transform = "scale(1)";
      image.style.transformOrigin = "center center";
    };

    imageContainer.addEventListener("mousemove", handleMouseMove);
    imageContainer.addEventListener("mouseenter", handleMouseEnter);
    imageContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      imageContainer.removeEventListener("mousemove", handleMouseMove);
      imageContainer.removeEventListener("mouseenter", handleMouseEnter);
      imageContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [srcObj, isHovered, currentZoom]);

  return (
    <Box
      ref={imageContainerRef}
      width="100%"
      minWidth="70%"
      height="100%"
      maxHeight="600px"
      position="relative"
      overflow="hidden"
      margin="0px auto"
      sx={zoomStyles}
    >
      <Image
        ref={imageRef}
        mx="auto"
        src={srcObj?.url}
        alt="image"
        maxW="100%"
        minW="50%"
        w="auto"
        maxH="600px"
        // fallbackSrc={fallback.src}
        h="600px"
        sx={zoomStyles}
      />
    </Box>
  );
};

export default ExpandedImage;
