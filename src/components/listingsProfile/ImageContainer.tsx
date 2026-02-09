import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import MediaCarousel from "./ui-lib/media/mediaCarousel";
import { useState } from "react";
import { SrcObjProp } from "./ui-lib/media/type";
import { BackIcon } from "../assets/listings/backIcon";
import { useRouter } from "next/navigation";

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
  const displayItemsLeft = (listOfMedia: SrcObjProp[], num: number) =>
    listOfMedia?.length - num;

  const handleClick = (id: number) => () => {
    setSelectedMedia(id);
    return modalDisclosure.onOpen();
  };
  return (
    <>
      <Flex gap="12px" pos="relative" w="full">
        <BackIcon
          pos="absolute"
          top="24px"
          onClick={() => router.back()}
          left="23px"
          display={{ md: "none", base: "inline-block" }}
        />
        <Skeleton
          startColor="#f5f5f5"
          endColor="#e4e4e7"
          isLoaded={!isLoading}
          flex="2"
          borderRadius={{ base: "none", xl: "12px" }}
          w="full"
        >
          <Image
            src={listOfMedia?.[0]?.url}
            fontSize="13px"
            onClick={handleClick(0)}
            pointerEvents={{ base: "none", md: "initial" }}
            cursor="pointer"
            alt="images"
            borderRadius={{ base: "none", xl: "12px" }}
            // flex="2"
            h="562px"
            w="full"
            bg="#00000066"
            objectFit="cover"
          />
        </Skeleton>
        {/* <HStack
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
            02/48
          </Text>
        </HStack> */}
        {listOfMedia?.[1]?.url || isLoading || listOfMedia?.[2]?.url ? (
          <Stack
            display={{ base: "none", xl: "flex" }}
            flex="1"
            w="full"
            spacing="12px"
            h="562px"
          >
            {listOfMedia?.[1]?.url || isLoading ? (
              <Skeleton
                startColor="#f5f5f5"
                endColor="#e4e4e7"
                isLoaded={!isLoading}
                h="full"
                borderRadius={{ base: "none", xl: "12px" }}
                w="full"
              >
                <Image
                  src={listOfMedia?.[1]?.url}
                  fontSize="13px"
                  onClick={handleClick(1)}
                  cursor="pointer"
                  alt="more images"
                  rounded="12px"
                  h="full"
                  w="full"
                  bg="#00000066"
                  objectFit="cover"
                />
              </Skeleton>
            ) : null}
            {!!listOfMedia?.[2]?.url || isLoading ? (
              <Skeleton
                startColor="#f5f5f5"
                endColor="#e4e4e7"
                isLoaded={!isLoading}
                h="full"
                borderRadius={{ base: "none", xl: "12px" }}
                w="full"
              >
                <Box rounded="12px" h="full" overflow="hidden" pos="relative">
                  <Image
                    src={listOfMedia?.[2]?.url}
                    fontSize="13px"
                    onClick={handleClick(2)}
                    cursor="pointer"
                    alt="more images"
                    rounded="12px"
                    h="full"
                    w="full"
                    objectFit="cover"
                  />
                  {!!displayItemsLeft(listOfMedia, 3) ? (
                    <Box
                      pos="absolute"
                      display="grid"
                      placeContent="center"
                      top={0}
                      w="full"
                      bg="#00000066"
                      h="full"
                    >
                      <Text color="#fff" borderBottom="2px solid #ffffff">
                        {`+${displayItemsLeft(listOfMedia, 3)} photo${
                          displayItemsLeft(listOfMedia, 3) > 1 ? "s" : ""
                        }`}
                      </Text>
                    </Box>
                  ) : null}
                </Box>
              </Skeleton>
            ) : null}
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
