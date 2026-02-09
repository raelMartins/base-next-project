import { WalkingProfileIcon } from "@/components/assets/listings/walkingProfileIcon";
import InHouseMap from "@/components/map";
import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { FaAngleRight, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMdClose, IoMdWalk } from "react-icons/io";
import { PiGlobe } from "react-icons/pi";

export const LandmarkAndMap = ({
  address = "",
  lat,
  lng,
}: {
  address: string;
  lat: number;
  lng: number;
}) => (
  <Stack
    w="full"
    display={{ base: "none", md: true ? "flex" : "none" }}
    spacing="24px"
  >
    <StackDivider borderBottom="0.5px solid #D4D4D8 !important" />
    <Box width="100%">
      <MapAndLandmarks
        address={address}
        longitude={lng}
        latitude={lat}
        landmarks={[
          { name: "FESTAC Town", distance: "30 km" },
          { name: "Abule-ado", distance: "30 km" },
          { name: "Alakija", distance: "30 km" },
        ]}
      />
    </Box>
  </Stack>
);

const MapAndLandmarks = ({
  address,
  longitude,
  latitude,
  landmarks,
}: {
  address: string;
  longitude: number;
  latitude: number;
  landmarks: { name: string; distance: string }[];
}) => {
  const mapSelectionModalRef = useRef<DefaultMapSelectionActions>(null);
  const [isMobile] = useMediaQuery("(max-width: 800px)");

  const goToGoogleMaps = () => {
    const lngLat = encodeURIComponent(`${latitude},${longitude}`);
    const mapUrl = `https://www.google.com/maps/dir/Current+Location/${lngLat}`;
    setTimeout(() => window.open(mapUrl, "_top"));
  };

  const openInMobileMapApp = (longitude: number, latitude: number) => {
    const userAgent =
      navigator.userAgent || navigator.vendor || (window as any).opera;
    const isIos =
      /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;

    if (isIos) {
      mapSelectionModalRef.current?.openMapSelectionModal(longitude, latitude);
    } else goToGoogleMaps();
  };

  const mapAction = (longitude?: number, latitude?: number) => {
    if (
      isMobile &&
      typeof longitude == "number" &&
      typeof latitude == "number"
    ) {
      openInMobileMapApp(longitude, latitude);
    } else {
      goToGoogleMaps();
    }
  };

  return (
    <>
      <VStack
        id="property-owner-and-map"
        display="flex"
        flex="2"
        maxWidth={{ lg: "522px", base: "auto" }}
        position={{ lg: "sticky", base: "relative" }}
        top={{ lg: "140px", base: "0" }}
        // top={{lg: '220px'}}
        height="fit-content"
        gap={{ md: "24px", base: "0" }}
      >
        <Box
          width="100%"
          rounded="16px"
          border="1px solid"
          bg="background.2"
          borderColor="#E4E4F7"
        >
          <Box
            display="block"
            width="100%"
            height={{ md: "224px", base: "200px" }}
          >
            <InHouseMap
              zoom={15}
              defaultCenter={{ lng: longitude, lat: latitude }}
              gestureHandling="none"
              zoomControl={false}
              containerStyling={{
                width: "100%",
                roundedTop: "16px",
                roundedBottom: "0",
                height: "100%",
              }}
            />
          </Box>
          <VStack
            alignItems="flex-start"
            width="100%"
            gap="8px"
            p="16px"
            borderTop="1px solid"
            borderColor="#E4E4F7"
          >
            <Text
              color="Grey.2"
              fontWeight={`500`}
              fontSize={{ md: "15px", base: "14px" }}
              lineHeight={{ md: "18px", base: "16px" }}
            >
              {address}
            </Text>
            <Button
              variant="unstyled"
              color="#1668E3"
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="fit-content"
              minHeight="none"
              onClick={() => mapAction(longitude, latitude)}
              isDisabled={!longitude && !latitude}
            >
              <Text fontSize="14px" lineHeight="18px" fontWeight="500">
                View in a map
              </Text>
              <Center width="18px" height="18px">
                <FaAngleRight size={10} />
              </Center>
            </Button>
          </VStack>
        </Box>
        {/* <Landmarks
          landmarks={landmarks}
          openMap={() => mapAction(longitude, latitude)}
        /> */}
      </VStack>
      <MapSelectionModal ref={mapSelectionModalRef} />
    </>
  );
};

const Landmarks = ({
  landmarks,
}: {
  landmarks: { name: string; distance: string }[];
  openMap: (lng: number, lat: number) => void;
}) => {
  return (
    <VStack width="100%" gap="20px" rounded="16px">
      <HStack
        width="100%"
        justify="flex-start"
        align="center"
        gap="8px"
        color="#272727"
      >
        <WalkingProfileIcon />
        <Text width="100%" fontSize="16px" fontWeight="600" lineHeight="100%">
          {"What's nearby"}
        </Text>
      </HStack>
      <List width="100%" display="flex" flexDirection="column" gap="8px">
        {landmarks?.map((landmark) => (
          <ListItem
            key={landmark.name}
            title={landmark.name}
            width="100%"
            pt="8px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap="8px"
            _first={{ borderTopWidth: "0", pt: "0" }}
          >
            <Text
              fontSize="14px"
              fontWeight="500"
              color="#272727"
              textTransform="capitalize"
              noOfLines={1}
            >
              {landmark.name}
            </Text>
            <Text
              fontSize="13px"
              fontWeight="500"
              lineHeight="18px"
              color="#555353"
              fontFamily="var(--font-sfpro)"
            >
              {landmark.distance}
            </Text>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

interface DefaultMapSelectionActions {
  openMapSelectionModal: (longitude: number, latitude: number) => void;
}

const MapSelectionModal = forwardRef<DefaultMapSelectionActions>(
  function ChooseDefaultMapModalForwardedRef({}, ref) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [coordinates, setCoordinates] = useState({
      longitude: 0,
      latitude: 0,
    });

    useImperativeHandle(ref, () => ({
      openMapSelectionModal: (longitude: number, latitude: number) => {
        onOpen();
        setCoordinates({ longitude, latitude });
      },
    }));

    return (
      <Modal
        variant="unstyled"
        autoFocus={false}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="rgba(0, 0, 0, 0.4)" />
        <ModalContent
          position="absolute"
          bottom="0"
          left="0"
          width="100%"
          maxWidth="none"
          bg="transparent"
          p="16px"
          m="0"
          outline="none"
          boxShadow="none"
          dropShadow="none"
        >
          <ModalBody
            width="100%"
            m="0"
            p="24px"
            bg="background.2"
            rounded="16px"
            height="fit-content"
          >
            <HStack
              width="100%"
              gap="16px"
              align="flex-start"
              justify="space-between"
            >
              <Box
                p="8px"
                rounded="16px"
                bg="background.2"
                boxShadow="0 4px 7px rgba(0, 0, 0, 0.08)"
                width="fit-content"
                height="fit-content"
                display="block"
              >
                <Center
                  boxSize="32px"
                  minWidth="32px"
                  rounded="12px"
                  outline="2px solid"
                  outlineColor="#206B5866"
                  boxShadow="0 5px 10px #105B4866"
                  backgroundSize="100% 100%"
                  background="linear-gradient(180deg, #24CC78 0%, #105B48 100%)"
                >
                  <Icon
                    as={PiGlobe}
                    fontSize="16px"
                    boxSize="16px"
                    minWidth="16px"
                    color="white"
                  />
                </Center>
              </Box>
              <Center onClick={onClose} boxSize="24px">
                <IoMdClose size={24} />
              </Center>
            </HStack>
            <VStack mt="16px" width="100%" gap="10px" align="flex-start">
              <Text
                fontSize="19px"
                fontWeight="600"
                lineHeight="20px"
                color="Grey.2"
              >
                Continue to map
              </Text>
              <Text
                mt="4px"
                fontSize="16px"
                fontWeight="400"
                lineHeight="20px"
                letterSpacing="2%"
                color="Grey.20"
              >
                Choose your preferred view to explore the location.
              </Text>
            </VStack>
            <HStack mt="20px" width="100%" gap="8px">
              <Box
                flex="1"
                height="fit-content"
                rounded="full"
                borderWidth="1px"
                borderStyle="solid"
                borderColor="border_color.1"
                color="Grey.2"
              >
                <a
                  onClick={onClose}
                  rel="norefferer noopener"
                  href={`https://maps.apple.com/?q=${coordinates.latitude},${coordinates.longitude}`}
                  target="_blank"
                  style={{
                    height: "48px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "24px",
                    gap: "8px",
                  }}
                >
                  <FaApple size={24} fontSize="24px" />
                  <Text
                    fontSize="16px"
                    fontWeight="500"
                    lineHeight="100%"
                    letterSpacing="1%"
                  >
                    Apple Maps
                  </Text>
                </a>
              </Box>
              <Box
                flex="1"
                height="fit-content"
                rounded="full"
                borderWidth="1px"
                borderStyle="solid"
                borderColor="border_color.1"
                color="Grey.2"
              >
                <a
                  onClick={onClose}
                  rel="norefferer noopener"
                  href={`https://www.google.com/maps/dir/Current+Location/${encodeURIComponent(
                    `${coordinates.latitude},${coordinates.longitude}`
                  )}`}
                  target="_blank"
                  style={{
                    height: "48px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "24px",
                    gap: "8px",
                  }}
                >
                  <FcGoogle size={24} fontSize="24px" />
                  <Text
                    fontSize="16px"
                    fontWeight="500"
                    lineHeight="100%"
                    letterSpacing="1%"
                  >
                    Google Maps
                  </Text>
                </a>
              </Box>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
);
