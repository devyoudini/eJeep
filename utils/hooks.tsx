import { useAuth } from "@/auth/AuthContext";
import { auth, database, db } from "@/firebaseConfig/firebase";
import axios from "axios";
import * as Location from "expo-location";
import {
  DataSnapshot,
  off,
  onDisconnect,
  onValue,
  ref,
  update,
} from "firebase/database";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { LatLng } from "react-native-maps";
import {
  apiReverseGeocoder,
  getUsersLocation,
  openLocationRequest,
} from "./locationFunctions";

/**
 * The `useLocation` function in TypeScript React manages location requests, updating location enabled
 * status, and loading state.
 * @returns The `useLocation` function returns an object with two properties: `isLoading` and
 * `onLocationRequest`. `isLoading` is a boolean state variable that indicates whether the location
 * request is currently loading. `onLocationRequest` is a function that initiates the location request
 * process by calling `openLocationRequest` with callbacks to handle the start, update, and end of the
 * location request process.
 */
export function useLocation() {
  const { updateLocationEnabled } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  function onLocationRequest() {
    openLocationRequest(
      // onstart
      () => {
        setIsLoading(true);
      },
      // locationUpdater
      () => {
        updateLocationEnabled();
      },
      // onEnd
      () => {
        setIsLoading(false);
      }
    );
  }

  return { isLoading, onLocationRequest };
}

/**
 * The `useWatchLocation` custom hook in TypeScript React uses the Location API to continuously track
 * the user's coordinates with high accuracy.
 * @returns The `useWatchLocation` function returns an object with a `coordinate` property. This
 * property holds an object with `latitude` and `longitude` values that are updated based on the user's
 * location changes.
 */
export function useWatchLocation() {
  const [coordinate, setCoordinate] = useState({
    latitude: 14.2223903,
    longitude: 121.1785456,
  });
  const [address, setAddress] = useState<string | null>("");

  useEffect(() => {
    (async () => {
      let location = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 5000,
        },
        ({ coords: { latitude, longitude } }) => {
          setCoordinate({ latitude: latitude, longitude: longitude });
          async function getAddress() {
            await Location.reverseGeocodeAsync(coordinate).then((location) => {
              setAddress(location[0].formattedAddress);
            });
          }
          getAddress();
        }
      );

      return location;
    })();
  }, []);

  return { coordinate, address };
}

/**
 * The function `onDisconnectClearLocation` uses Firebase Realtime Database to manage user connections
 * and clear location data upon disconnection.
 * @returns The `onDisconnectClearLocation` function is returning a function that sets up a listener to
 * monitor the connection status of the user and performs actions based on whether the user is
 * connected or disconnected.
 */
export function useOnDisconnectClearLocation() {
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    // const q = query()
    const locationRef = ref(database, `locations/${user.uid}`);
    const connectedRef = ref(database, ".info/connected");

    function onDisconnection() {
      const Snap = (snap: DataSnapshot) => {
        if (snap.val() === true) {
          update(locationRef, {
            isOnline: true,
          });

          onDisconnect(locationRef).update({
            isOnline: false,
          });

          return off(locationRef, "child_changed");
        }
      };

      onValue(connectedRef, Snap);

      return () => {
        off(connectedRef, "child_changed");
      };
    }

    onDisconnection();
  }, []);
}

/**
 * The `useLastLocation` custom hook in TypeScript React retrieves the user's current location and
 * returns an object containing latitude and longitude values.
 * @returns The `useLastLocation` custom hook returns an object with `latitude` and `longitude`
 * properties, initialized to 0, and then updated with the user's location coordinates after the
 * `getUsersLocation` function is called asynchronously.
 */
export function useLastLocation() {
  const [value, setValue] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 14.203,
    longitude: 121.096,
  });

  useEffect(() => {
    async function getLoc() {
      await getUsersLocation().then(({ latitude, longitude }) => {
        setValue({ latitude: latitude, longitude: longitude });
      });
    }

    getLoc();
  }, []);

  return value;
}

export interface Marker {
  userId: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  currentCoordinate: {
    latitude: number;
    longitude: number;
  };
  role: "Driver" | "Passenger";
  isOnline: boolean;
  passengerCount?: number | null | undefined;
}

export function useGetAllUsers(info?: UserInfo | undefined) {
  const [datas, setDatas] = useState<Marker[]>([]);

  useEffect(() => {
    const getData = async () => {
      const locationRef = ref(database, `locations/`);

      const onDataChange = (snap: { val: () => { [key: string]: Marker } }) => {
        const data = snap.val();

        const markersArray: Marker[] = Object.values(data || {}).filter(
          (marker) => {
            return (
              marker.isOnline &&
              // marker.userId !== auth.currentUser?.uid &&
              (info?.role === "Driver"
                ? marker.role === "Passenger"
                : marker.role === "Driver")
            );
          }
        );

        setDatas(markersArray);
      };
      onValue(locationRef, onDataChange);

      return () => {
        off(locationRef, "value", onDataChange);
      };
    };

    getData();
  }, []);

  return datas;
}

export function useGetCurrentUserInfo() {
  const [data, setData] = useState<Marker[]>([]);

  useEffect(() => {
    const getData = async () => {
      const locationRef = ref(database, `locations/`);

      const onDataChange = (snap: { val: () => { [key: string]: Marker } }) => {
        const data = snap.val();

        const markersArray: Marker[] = Object.values(data || {}).filter(
          (marker) => {
            return marker.userId === auth.currentUser?.uid;
          }
        );

        setData(markersArray);
      };
      onValue(locationRef, onDataChange);

      return () => {
        off(locationRef, "value", onDataChange);
      };
    };

    getData();
  }, [auth.currentUser]);

  return data;
}

export interface UserInfo {
  email: string;
  isVerified: boolean;
  name?: string;
  role: "Driver" | "Passenger";
  userId: string;
}

export function getUserInfo() {
  const [user, setUser] = useState<UserInfo>();
  const [datas, setDatas] = useState<Marker[]>([]);

  useEffect(() => {
    if (!auth.currentUser) return; // No user logged in, return undefined

    const userRef = doc(db, "users", auth.currentUser.uid);

    const fetchData = async () => {
      try {
        const res = await getDoc(userRef);
        if (res.exists()) {
          const userData = res.data() as UserInfo;
          setUser(userData);
        } else {
          throw new Error("User not found!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData().then(() => {
      const locationRef = ref(database, `locations/`);

      const onDataChange = (snap: { val: () => { [key: string]: Marker } }) => {
        const data = snap.val();

        const markersArray: Marker[] = Object.values(data || {}).filter(
          (marker) => {
            return (
              marker.isOnline &&
              marker.userId !== user?.userId &&
              (user?.role === "Driver"
                ? marker.role === "Passenger"
                : marker.role === "Driver")
            );
          }
        );

        setDatas(markersArray);
      };
      onValue(locationRef, onDataChange);

      return () => {
        off(locationRef, "value", onDataChange);
      };
    });
  }, [user]);

  return { user, datas };
}

export function useAddressUsingCoordinates(coordinates: LatLng): string {
  const [address, setAddress] = useState<string>("");
  axios
    .get(apiReverseGeocoder(coordinates.latitude, coordinates.longitude))
    .then((response) => {
      setAddress(response.data.display_name);
    })
    .catch((err) => {
      console.log(err);
    });
  return address;
}

export function reverseGeocoding(coordinates: LatLng) {
  const [address, setAddress] = useState<string | null>("");

  useEffect(() => {
    async function getAddress() {
      await Location.reverseGeocodeAsync(coordinates).then((location) => {
        setAddress(location[0].formattedAddress);
      });
    }

    getAddress();
  }, [coordinates]);

  return address;
}
