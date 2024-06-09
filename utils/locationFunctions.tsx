import * as Location from "expo-location";
import { Linking } from "react-native";
import MapView from "react-native-maps";

/**
 * The above functions use TypeScript and React to retrieve the user's location and check location
 * permissions.
 * @returns For the `getUsersLocation` function, it returns an object with the keys `latitude` and
 * `longitude` representing the user's current location coordinates.
 */
export async function getUsersLocation() {
  const {
    coords: { latitude, longitude },
  } = await Location.getCurrentPositionAsync();


  return { latitude, longitude };
}

export async function getLocationPermission() {
  let { granted } = await Location.getForegroundPermissionsAsync();
  return { granted };
}

/**
 * The function `openLocationRequest` requests foreground location permissions, updates location if
 * granted, and prompts user to enable location settings if denied.
 * @param onStart - The `onStart` parameter is a function that will be called at the beginning of the
 * `openLocationRequest` function. It is used to perform any actions or setup before initiating the
 * location request process.
 * @param locationUpdater - The `locationUpdater` parameter in the `openLocationRequest` function is a
 * function that is called when the location permission is granted. It is responsible for updating the
 * location or performing any necessary actions related to location services.
 * @param onEnd - The `onEnd` parameter is a function that will be called after the location request
 * process is completed, whether it is successful or not. It is used to perform any necessary cleanup
 * or final actions related to the location request.
 */
export function openLocationRequest(
  onStart: () => void,
  locationUpdater: () => void,
  onEnd: () => void
) {
  onStart();
  setTimeout(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        locationUpdater();
        return;
      } else if (status === "denied") {
        await Linking.sendIntent(
          "android.settings.ACTION_LOCATION_SOURCE_SETTINGS"
        );
        return;
      }
    })().finally(() => {
      onEnd();
    });
  }, 2000);
}

/**
 * The function `gotoUsersLocation` takes a map reference, latitude, and longitude as parameters and
 * animates the camera to the specified location on the map.
 * @param {MapView | undefined} mapRef - The `mapRef` parameter is a reference to the MapView component
 * that is used to display a map in the application. It is of type `MapView | undefined`, which means
 * it can either be a reference to a MapView component or `undefined` if it has not been initialized or
 * is not
 * @param {number} latitude - Latitude is the angular distance of a location north or south of the
 * earth's equator, measured in degrees along a meridian. It specifies the north-south position of a
 * point on the Earth's surface.
 * @param {number} longitude - The `longitude` parameter in the `gotoUsersLocation` function represents
 * the longitude coordinate of the user's location on the map. It is a numeric value that specifies the
 * east-west position of a point on the Earth's surface relative to the Prime Meridian.
 * @returns If the `mapRef` is not defined (i.e., `undefined`), the function will return early and not
 * execute the rest of the code block.
 */
export function gotoUsersLocation(
  mapRef: MapView | undefined,
  latitude: number,
  longitude: number
) {
  if (!mapRef) return;

  mapRef.animateCamera(
    {
      center: {
        latitude: latitude,
        longitude: longitude,
      },
      heading: 1,
      zoom: 15,
    },
    { duration: 1000 }
  );
}

export function googleReverseGeocoder(lat: number, long: number) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}
  &location_type=ROOFTOP&result_type=street_address&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`;

  return url;
}

export function apiReverseGeocoder(lat: number, long: number) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=jsonv2`;

  return url;
}
