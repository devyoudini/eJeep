import { Marker } from "@/utils/hooks";
import { delay } from "@/utils/utils";
import React, { useEffect, useRef } from "react";
import { LatLng, MapMarker, Marker as Mak } from "react-native-maps";

const AnimatedMarker = ({
  currentCoordinate,
  coordinate,
  uri,
}: {
  currentCoordinate?: LatLng | null | undefined;
  coordinate: LatLng;
  uri: string;
  markerData?: Marker;
}) => {
  const markerRef = useRef<MapMarker | null>(null);

  useEffect(() => {
    if (!markerRef.current) return;
    markerRef.current.redraw();
  }, [currentCoordinate?.latitude, currentCoordinate?.longitude]);

  // const animate = async (latitude: number, longitude: number) => {
  //   if (!latitude || !longitude) return;

  //   const newCoordinate = { latitude, longitude };

  //   if (markerRef.current) {
  //     markerRef.current.animateMarkerToCoordinate(newCoordinate, 5000);
  //   }
  // };

  return (
    <Mak.Animated
      ref={markerRef}
      coordinate={currentCoordinate ? currentCoordinate : coordinate}
      image={{ uri: uri }}
      tracksViewChanges={false}
    />
  );
};

export default AnimatedMarker;
