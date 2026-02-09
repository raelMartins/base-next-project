import { Box, ChakraProps } from "@chakra-ui/react";
import { APIProvider, Map, type MapProps } from "@vis.gl/react-google-maps";
import { shortenPrice } from "@veerge/utils";
import { cubicBezier, motion } from "framer-motion";
import { MapContent } from "./mapContent";

export { shortenPrice };

export interface MarkerProp {
  lng: number;
  lat: number;
  price?: number;
  units?: number;
}
interface InHouseMapProps extends MapProps {
  markers?: Partial<MarkerProp>[];
  renderMarker?: (prop: MarkerProp) => React.ReactNode;
  onZoomIn?: (zoom?: number) => void;
  onZoomOut?: (zoom?: number) => void;
  containerStyling: ChakraProps;
}

const MotionBox = motion.create(Box);

export default function InHouseMap(mapProps: InHouseMapProps) {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}>
      <MapContainer {...mapProps} />
    </APIProvider>
  );
}

function MapContainer({
  containerStyling = {},
  markers = [],
  renderMarker,
  disableDefaultUI = true,
  gestureHandling = "greedy",
  mapId = "Map_id",
  zoom,
  ...mapProps
}: InHouseMapProps) {
  return (
    <MotionBox
      as={motion.div}
      height="auto"
      width="100%"
      overflow="hidden"
      transition={
        {
          duration: 0.5,
          ease: cubicBezier(0.3, 1, 0.16, 1),
        } as any
      }
      {...containerStyling}
    >
      <Map
        mapId={mapId}
        disableDefaultUI={disableDefaultUI}
        gestureHandling={gestureHandling}
        {...mapProps}
      >
        <MapContent
          zoom={zoom}
          markers={markers as MarkerProp[]}
          CustomMarker={renderMarker}
        />
      </Map>
    </MotionBox>
  );
}

