import { useCallback, useEffect } from 'react';
import { MarkerProp } from '.';
import { useMap } from '@vis.gl/react-google-maps';
import MapMarkers from './mapMarkers';

export const MapContent = ({
  zoom = 4,
  markers,
  CustomMarker
}: {
  zoom?: number | null;
  markers?: MarkerProp[];
  CustomMarker?: (props: MarkerProp) => React.ReactNode;
}) => {
  const map = useMap();

  const resizeMapFitBounds = useCallback(() => {
    if (!map) return;

    const bounds = new google.maps.LatLngBounds();

    markers?.forEach(({ lng, lat }) => {
      if (typeof lng == 'number' && typeof lat == 'number')
        bounds.extend(new google.maps.LatLng(lat, lng));
    });

    map.fitBounds(bounds, 20);

    if (!zoom) return;
    google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
      const mapZoom = map.getZoom();
      if (!mapZoom || Number(mapZoom) > 18) map.setZoom(zoom);
    });
  }, [markers, map]);

  useEffect(() => {
    if (!map) return;

    resizeMapFitBounds();
  }, [markers, map]);

  return (
    <>
      <MapMarkers markers={markers} CustomMarker={CustomMarker} />
    </>
  );
};
