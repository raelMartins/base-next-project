import React from 'react';
import { MarkerProp, shortenPrice } from '.';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { Center, HStack, Text } from '@chakra-ui/react';
import { PiBed } from 'react-icons/pi';

import { fixIcon } from '../../utils/helpers/fix-icon';

const BedIcon = fixIcon(PiBed);

interface MapMarkerProps {
  CustomMarker?: (args: MarkerProp) => React.ReactNode;
  markers?: MarkerProp[];
  onMarkerMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMarkerMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

export default function MapMarkers({
  CustomMarker,
  markers,
  onMarkerMouseEnter,
  onMarkerMouseLeave
}: MapMarkerProps) {
  return markers?.map((marker, index) =>
    typeof marker?.lng == 'number' && typeof marker?.lat == 'number' ? (
      CustomMarker ? (
        <CustomMarker key={index} {...(marker as MarkerProp)} />
      ) : (
        <CustomListingMarker key={index} {...(marker as MarkerProp)} />
      )
    ) : null
  );
}

export const CustomListingMarker = (props: MarkerProp) => {
  const position = { lat: props.lat, lng: props.lng };

  return (
    <AdvancedMarker position={position}>
      <HStack
        width='fit-content'
        position='relative'
        p='2px'
        pr='8px'
        gap='3px'
        bg='white'
        rounded='full'
        cursor='default'
        boxShadow='0 2px 4px rgba(0, 0, 0, 0.06)'
        _after={{
          content: "''",
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%) translateY(50%) rotate(45deg)',
          roundedBottomRight: '3px',
          boxSize: '8px',
          boxShadow: '0 3px 4px rgba(0, 0, 0, 0.06)',
          bg: 'white'
        }}
      >
        <Center
          bg='#16A34A'
          color='white'
          boxSize='16px'
          minWidth='16px'
          rounded='full'
        >
          <BedIcon fontSize='10px' />
        </Center>
        <Text
          position='relative'
          fontSize='13px'
          fontWeight='600'
          lineHeight='100%'
          letterSpacing='1%'
          color='#191919'
        >
          {props?.units
            ? `${new Intl.NumberFormat('en-US').format(props.units)} ${props?.units == 1 ? 'unit' : 'units'}`
            : shortenPrice(props?.price ?? 0)}
        </Text>
      </HStack>
    </AdvancedMarker>
  );
};
