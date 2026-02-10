import { useCallback, useEffect } from 'react';
import { MarkerProp } from '.';
import { useMap } from '@vis.gl/react-google-maps';
import MapMarkers from './mapMarkers';

/** West Africa center (Gulf of Guinea region) for initial map view */
const WEST_AFRICA_CENTER = { lat: 8.5, lng: 2.5 };
const WEST_AFRICA_ZOOM = 5;

/** Africa bounding box (approx.) - used to filter pins and find densest area */
const AFRICA_BOUNDS = {
  minLat: -35,
  maxLat: 37,
  minLng: -18,
  maxLng: 52
};

const GRID_CELL_SIZE = 1; // degrees; smaller = finer density

function isInAfrica(lat: number, lng: number): boolean {
  return (
    lat >= AFRICA_BOUNDS.minLat &&
    lat <= AFRICA_BOUNDS.maxLat &&
    lng >= AFRICA_BOUNDS.minLng &&
    lng <= AFRICA_BOUNDS.maxLng
  );
}

/** Find the densest area of pins in Africa: grid-based count, return centroid of densest cell */
function getDensestCenterInAfrica(markers: { lat: number; lng: number }[]): {
  lat: number;
  lng: number;
} {
  const inAfrica = markers.filter((m) => isInAfrica(m.lat, m.lng));
  if (inAfrica.length === 0) return WEST_AFRICA_CENTER;

  const cellKey = (lat: number, lng: number) =>
    `${Math.floor(lat / GRID_CELL_SIZE) * GRID_CELL_SIZE}_${Math.floor(lng / GRID_CELL_SIZE) * GRID_CELL_SIZE}`;

  const cellToMarkers = new Map<string, { lat: number; lng: number }[]>();
  for (const m of inAfrica) {
    const key = cellKey(m.lat, m.lng);
    if (!cellToMarkers.has(key)) cellToMarkers.set(key, []);
    cellToMarkers.get(key)!.push(m);
  }

  let densest: { lat: number; lng: number }[] = [];
  for (const markersInCell of cellToMarkers.values()) {
    if (markersInCell.length > densest.length) densest = markersInCell;
  }

  const n = densest.length;
  const lat = densest.reduce((a, m) => a + m.lat, 0) / n;
  const lng = densest.reduce((a, m) => a + m.lng, 0) / n;
  return { lat, lng };
}

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

  const validMarkers = markers?.filter(
    (m) =>
      typeof m.lng === 'number' &&
      typeof m.lat === 'number' &&
      Number.isFinite(m.lng) &&
      Number.isFinite(m.lat)
  );

  const setWestAfricaView = useCallback(() => {
    if (!map) return;
    map.setCenter(WEST_AFRICA_CENTER);
    map.setZoom(WEST_AFRICA_ZOOM);
  }, [map]);

  const applyMapView = useCallback(() => {
    if (!map) return;

    if (!validMarkers?.length) {
      setWestAfricaView();
      return;
    }

    // Pan to densest area of pins in Africa (grid-based), keep current zoom
    const center = getDensestCenterInAfrica(validMarkers);

    const currentZoom = map.getZoom();
    const zoomToKeep =
      currentZoom != null && Number.isFinite(currentZoom)
        ? currentZoom
        : WEST_AFRICA_ZOOM;

    map.setCenter(center);
    map.setZoom(zoomToKeep);
  }, [validMarkers, map, setWestAfricaView]);

  useEffect(() => {
    if (!map) return;

    applyMapView();
  }, [map, applyMapView]);

  return (
    <>
      <MapMarkers markers={markers} CustomMarker={CustomMarker} />
    </>
  );
};
