import {
  Box,
  Flex,
  HStack,
  Icon,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { FiVolume2 } from "react-icons/fi";
import { MdZoomOutMap } from "react-icons/md";
import { ControlsProps } from "../type";

const Controls = ({
  videoRef,
  setCurrentTime,
  setVolume,
  imageRef,
  setCurrentZoom,
  setIsHovered,
  isHovered,
  selectedMedia,
  setSelectedMedia,
  listOfMedia,
  srcObj,
  currentTime,
  duration,
  currentZoom,
  volume,
}: ControlsProps) => {
  const handleProgressChange = (value: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = value;
    setCurrentTime(value);
  };

  const handleVolumeChange = (value: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = value;
    setVolume(value);
  };
  const handleZoomChange = (value: number) => {
    const image = imageRef.current;
    if (!image) return;

    setCurrentZoom(value);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  return (
    <Flex
      p="20px 32px"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      alignItems="center"
      justifyContent="space-between"
      h="72px"
      pos="absolute"
      opacity={isHovered ? 1 : 0}
      left="0"
      transition="0.3s ease-in-out"
      bottom={isHovered ? 0 : "-72px"}
      w="full"
      backdropFilter="blur(7.21px)"
      bg="#00000033"
    >
      <Flex
        pos="relative"
        zIndex={22}
        h="full"
        gap="6px"
        alignItems="center"
        justifyContent="center"
      >
        <Icon
          role="button"
          onClick={
            selectedMedia == 0
              ? undefined
              : () => setSelectedMedia((prev: any) => prev - 1)
          }
          opacity={selectedMedia == 0 ? 0.2 : 1}
          cursor={selectedMedia == 0 ? "not-allowed" : "pointer"}
          as={BsFillArrowLeftCircleFill}
          boxSize="32px"
          color="#ffffff"
        />
        <Icon
          onClick={
            selectedMedia == listOfMedia?.length - 1
              ? undefined
              : () => setSelectedMedia((prev: any) => prev + 1)
          }
          opacity={selectedMedia == listOfMedia?.length - 1 ? 0.2 : 1}
          cursor={
            selectedMedia == listOfMedia?.length - 1 ? "not-allowed" : "pointer"
          }
          role="button"
          as={BsFillArrowRightCircleFill}
          boxSize="32px"
          color="#ffffff"
        />
      </Flex>
      {srcObj?.type === "video" ? (
        <VStack
          w="full"
          p={"0px 0px 32px"}
          h="full"
          spacing={"4px"}
          position="absolute"
          bottom={0}
          left={0}
          top={"-9.5px"}
          right={0}
          display="flex"
          alignItems="center"
          transition="opacity 0.3s"
          pl="6px"
        >
          {/* Progress Bar */}

          <Box w="full" justifySelf="start">
            <Slider
              value={currentTime}
              max={duration}
              onChange={handleProgressChange}
              focusThumbOnChange={false}
              transition="0.3s ease-in-out"
            >
              <SliderTrack bg="whiteAlpha.300" h="4px">
                <SliderFilledTrack bg="white" />
              </SliderTrack>
              <SliderThumb boxSize="12px" bg="white" />
            </Slider>
          </Box>

          {/* Time Display */}

          <HStack
            transform="translate(0%,-50%)"
            right={0}
            w="fit-content"
            mx="auto"
            spacing={1}
          >
            <Text color="white" fontSize="sm" fontWeight="medium">
              {formatTime(currentTime)}
            </Text>
            <Text color="white" fontSize="sm">
              /
            </Text>
            <Text color="white" fontSize="sm" fontWeight="medium">
              {formatTime(duration)}
            </Text>
          </HStack>
        </VStack>
      ) : null}

      <Flex justifyContent="end" position="relative">
        {/* video volume Control s */}
        {srcObj?.type === "video" ? (
          <HStack w="100px" spacing={2}>
            <HStack spacing={2} w="full" maxW="100px">
              <FiVolume2 color="white" />
              <Slider
                value={volume}
                max={1}
                step={0.1}
                onChange={handleVolumeChange}
                focusThumbOnChange={false}
              >
                <SliderTrack bg="whiteAlpha.300" h="3px">
                  <SliderFilledTrack bg="blue.400" />
                </SliderTrack>
                <SliderThumb boxSize="10px" bg="blue.400" />
              </Slider>
            </HStack>
          </HStack>
        ) : null}

        {/**
         * zoom control
         */}
        {srcObj?.type === "image" ? (
          <HStack justifySelf="center" w="100px" spacing={2}>
            <HStack spacing={2} w="full" maxW="100px">
              <MdZoomOutMap color="white" />
              <Slider
                value={currentZoom}
                max={3}
                min={1}
                step={0.1}
                onChange={handleZoomChange}
                focusThumbOnChange={false}
              >
                <SliderTrack bg="whiteAlpha.300" h="3px">
                  <SliderFilledTrack bg="blue.400" />
                </SliderTrack>
                <Tooltip
                  variant="noir"
                  hasArrow
                  placement="top"
                  label={`x ${currentZoom}`}
                >
                  <SliderThumb boxSize="10px" bg="blue.400" />
                </Tooltip>
              </Slider>
            </HStack>
          </HStack>
        ) : null}
      </Flex>
    </Flex>
  );
};

export default Controls;
