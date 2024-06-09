import { jeepUri, mapPadding, userUri } from "@/constants";
import {
  polylineCoordinates,
  terminalCoordinates,
} from "@/constants/mapConstants";
import { driverUri } from "@/constants/uris";
import { styles } from "@/styles";
import { updateAddress, updateLocation } from "@/utils/authFunctions";
import {
  Marker as MarkerInterface,
  useGetCurrentUserInfo,
  UserInfo,
  useWatchLocation,
} from "@/utils/hooks";
import { gotoUsersLocation } from "@/utils/locationFunctions";
import React, { useRef } from "react";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import PassengerCounterController from "../PassengerCounterController";
import PositionButton from "../positionButton";
import AnimatedMarker from "./MapMarkerComponent";
import PassengerCountDisplay from "./PassengerCountDisplay";

export default function MapComponent({
  datas,
  info,
}: {
  datas: MarkerInterface[];
  info?: UserInfo | undefined;
}) {
  const mapRef = useRef<MapView>();

  const { coordinate } = useWatchLocation();
  const userInfo = useGetCurrentUserInfo();

  function onUserPosition() {
    gotoUsersLocation(
      mapRef.current,
      coordinate.latitude,
      coordinate.longitude
    );
  }

  function markerHandler(role: string) {
    if (role === "Driver") {
      return driverUri;
    } else return userUri;
  }

  return (
    <>
      <MapView
        //@ts-ignore
        ref={mapRef}
        //@ts-check
        provider={PROVIDER_GOOGLE}
        loadingBackgroundColor="white"
        loadingIndicatorColor="black"
        showsMyLocationButton={false}
        style={styles.map}
        mapPadding={mapPadding}
        onMapLoaded={() => {
          setTimeout(() => {
            onUserPosition();
          }, 2000);
        }}
        loadingEnabled={true}
        showsTraffic={true}
        showsUserLocation={true}
        showsIndoorLevelPicker={true}
        showsCompass={false}
        onUserLocationChange={async ({ nativeEvent }) => {
          if (!nativeEvent.coordinate) return null;
          if (!mapRef.current) return null;

          updateLocation(
            nativeEvent.coordinate.latitude,
            nativeEvent.coordinate.longitude
          );
          await mapRef.current
            .addressForCoordinate(coordinate)
            .then(
              ({
                name,
                administrativeArea,
                locality,
                subAdministrativeArea,
                subLocality,
                thoroughfare,
                subThoroughfare,
                country,
              }) => {
                if (!name) return;
                updateAddress(
                  `${name}, ${subThoroughfare ? subThoroughfare + "," : ""} ${
                    thoroughfare ? thoroughfare + "," : ""
                  } ${
                    subLocality ? subLocality + "," : ""
                  } ${locality}, ${subAdministrativeArea}, ${administrativeArea}, ${country}`
                );
              }
            );
        }}
        userLocationPriority="high"
        userLocationUpdateInterval={10000}
        userLocationFastestInterval={5000}
      >
        {datas.map((marker) => {
          return (
            <AnimatedMarker
              key={marker.userId}
              coordinate={marker.coordinates}
              currentCoordinate={marker.currentCoordinate}
              uri={markerHandler(marker.role)}
              markerData={marker}
            />
          );
        })}
        <Polyline
          coordinates={polylineCoordinates}
          strokeColor="#FF5733"
          strokeWidth={4}
        />
        {terminalCoordinates.map((terminal, index) => {
          return (
            <Marker
              key={index}
              coordinate={terminal}
              image={{ uri: jeepUri }}
              title={index == 1 ? "Calamba Terminal" : "Canlubang Terminal"}
            />
          );
        })}
      </MapView>
      {info?.role === "Driver" ? (
        !userInfo ? null : (
          <>
            <PassengerCounterController userInfo={userInfo} />
            <PassengerCountDisplay userInfo={userInfo} />
          </>
        )
      ) : null}
      <PositionButton onPress={onUserPosition} />
    </>
  );
}
