import {
  Box,
  Flex,
  HStack,
  Image,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import { SrcObjProp } from "./ui-lib/media/type";
import { BackIcon } from "../assets/listings/backIcon";
import MediaCarousel from "./ui-lib/media/mediaCarousel";

const ImageContainer = ({
  listOfMedia,
  isLoading,
}: {
  listOfMedia: SrcObjProp[];
  isLoading: boolean;
}) => {
  const [selectedMedia, setSelectedMedia] = useState(0);
  const modalDisclosure = useDisclosure();
  const router = useRouter();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });

  const [activeIndex, setActiveIndex] = useState(1);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(); // Set initial index
    emblaApi.on("select", onSelect); // Listen for slide changes
    emblaApi.on("reInit", onSelect); // Re-run if data changes
  }, [emblaApi, onSelect]);

  const displayItemsLeft = (listOfMedia: SrcObjProp[], num: number) =>
    (listOfMedia?.length || 0) - num;

  const handleClick = (id: number) => () => {
    setSelectedMedia(id);
    return modalDisclosure.onOpen();
  };

  return (
    <>
      <Box
        display={{ base: "block", xl: "none" }}
        w="full"
        pos="relative"
        overflow="hidden"
      >
        <BackIcon
          pos="absolute"
          top="24px"
          left="23px"
          zIndex={10}
          onClick={() => router.back()}
        />

        <Box overflow="hidden" pos="relative" ref={emblaRef}>
          <Flex>
            {isLoading ? (
              <Skeleton w="full" h="300px" />
            ) : (
              listOfMedia?.map((item, index) => (
                <Box
                  key={index}
                  flex="0 0 100%" // Force each slide to be 100% width
                  minW={0}
                  h="350px"
                >
                  <Image
                    src={item.url}
                    alt={`mobile-img-${index}`}
                    w="full"
                    h="full"
                    objectFit="cover"
                  />
                </Box>
              ))
            )}
          </Flex>
          {listOfMedia?.length < 2 ? null : (
            <HStack
              pos="absolute"
              bottom="20px"
              right="18px"
              display={{ base: "flex", xl: "none" }}
              rounded="200px"
              p="10px 16px"
              spacing="4px"
              background="#00000033"
              boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
              backdropFilter="blur(7.21px)"
            >
              <Text
                fontWeight="500"
                fontSize="16px"
                color="#ffffff"
                lineHeight="100%"
                letterSpacing="-2%"
              >
                {activeIndex + 1}/{listOfMedia?.length}
              </Text>
            </HStack>
          )}
        </Box>
      </Box>

      <Flex
        gap="12px"
        pos="relative"
        w="full"
        display={{ base: "none", xl: "flex" }}
      >
        <Skeleton isLoaded={!isLoading} flex="2" borderRadius="12px">
          <Image
            src={listOfMedia?.[0]?.url}
            onClick={handleClick(0)}
            cursor="zoom-in"
            alt="main-image"
            borderRadius="12px"
            h="562px"
            w="full"
            objectFit="cover"
          />
        </Skeleton>

        {listOfMedia?.length > 1 || isLoading ? (
          <Stack flex="1" spacing="12px" h="562px">
            <Skeleton isLoaded={!isLoading} h="full" borderRadius="12px">
              <Image
                src={listOfMedia?.[1]?.url}
                onClick={handleClick(1)}
                cursor="zoom-in"
                rounded="12px"
                h="full"
                w="full"
                objectFit="cover"
              />
            </Skeleton>

            {(listOfMedia?.[2]?.url || isLoading) && (
              <Skeleton isLoaded={!isLoading} h="full" borderRadius="12px">
                <Box rounded="12px" h="full" overflow="hidden" pos="relative">
                  <Image
                    src={listOfMedia?.[2]?.url}
                    onClick={handleClick(2)}
                    cursor="zoom-in"
                    rounded="12px"
                    h="full"
                    w="full"
                    objectFit="cover"
                  />
                  {displayItemsLeft(listOfMedia, 3) > 0 && (
                    <Box
                      pos="absolute"
                      pointerEvents="none"
                      display="grid"
                      placeContent="center"
                      top={0}
                      w="full"
                      bg="#00000066"
                      h="full"
                    >
                      <Text color="#fff" borderBottom="2px solid #ffffff">
                        {`+${displayItemsLeft(listOfMedia, 3)} more`}
                      </Text>
                    </Box>
                  )}
                </Box>
              </Skeleton>
            )}
          </Stack>
        ) : null}
      </Flex>

      <MediaCarousel
        setSelectedMedia={setSelectedMedia}
        listOfMedia={listOfMedia}
        selectedMedia={selectedMedia}
        modal={modalDisclosure}
      />
    </>
  );
};

export default ImageContainer;
