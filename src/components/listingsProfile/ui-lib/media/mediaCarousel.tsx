import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import VideoView from "./components/videoView";
import ExpandedImage from "./components/expandedImage";
import Controls from "./components/control";
import { MediaCarouselProps } from "./type";

export default function MediaCarousel({
  modal,
  setSelectedMedia,
  listOfMedia,
  selectedMedia,
}: MediaCarouselProps) {
  const srcObj = listOfMedia?.[selectedMedia] ?? {};
  const [isHovered, setIsHovered] = useState(false);
  const [isShortScreenHeight] = useMediaQuery("(max-height: 740px)");

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const imageRef = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [currentZoom, setCurrentZoom] = useState(1.5);

  useEffect(() => {
    if (!modal.isOpen) return;
    setIsHovered(true);
  }, [modal.isOpen]);
  return (
    <Modal
      scrollBehavior="inside"
      isCentered
      autoFocus={false}
      isOpen={modal.isOpen}
      onClose={modal.onClose}
      motionPreset={"scale"}
    >
      <ModalOverlay bg="rgba(0,0,0,0.2)" />
      <ModalContent
        px={0}
        pb={6}
        pt={6}
        shadow="lg"
        borderRadius="2xl"
        minW={{ md: "400px" }}
        transform={isShortScreenHeight ? "scale(0.7) !important" : "none"}
        color="#191919"
        overflow="hidden"
        maxW={{ base: "90%", md: "1190px" }}
        bg="gray"
        pos="relative"
        style={{ ...glassmorphicBg }}
        minH="600px"
      >
        <ModalBody overflow="hidden" m="0px" p="0px">
          <Flex
            maxH="600px"
            h={{ base: "full", md: "600px" }}
            width={"auto"}
            justifyContent="space-between"
            alignItems={"center"}
          >
            {srcObj?.type === "video" ? (
              <VideoView
                isPlaying={isPlaying}
                setCurrentTime={setCurrentTime}
                setDuration={setDuration}
                setIsPlaying={setIsPlaying}
                setVolume={setVolume}
                srcObj={srcObj}
                videoRef={videoRef}
              />
            ) : srcObj?.type === "image" ? (
              <ExpandedImage
                currentZoom={currentZoom}
                imageContainerRef={imageContainerRef}
                imageRef={imageRef}
                isHovered={isHovered}
                modal={modal}
                setIsHovered={setIsHovered}
                srcObj={srcObj}
              />
            ) : null}
          </Flex>
        </ModalBody>
        <Controls
          currentTime={currentTime}
          currentZoom={currentZoom}
          duration={duration}
          imageRef={imageRef}
          isHovered={isHovered}
          listOfMedia={listOfMedia}
          selectedMedia={selectedMedia}
          setCurrentTime={setCurrentTime}
          setCurrentZoom={setCurrentZoom}
          setIsHovered={setIsHovered}
          setSelectedMedia={setSelectedMedia}
          setVolume={setVolume}
          srcObj={srcObj}
          videoRef={videoRef}
          volume={volume}
        />
        <Box
          h={6}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          w="full"
          pos="absolute"
          left={0}
          bottom={0}
        />
      </ModalContent>
    </Modal>
  );
}

const glassmorphicBg = {
  background: "#00000033",
  borderRadius: "16px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",

  backdropFilter: "blur(7.215007305145264px)",

  border: "1px solid rgba(255, 255, 255, 0.3)",
};
