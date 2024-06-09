import { auth, database, db } from "@/firebaseConfig/firebase";
import { User } from "firebase/auth";
import { increment, ref, set, update } from "firebase/database";
import { doc, setDoc } from "firebase/firestore";
import { delay } from "./utils";

/**
 * The function `createAccount` creates a user account with specified details and roles in a TypeScript
 * React application.
 * @param {User} user - The `user` parameter is an object that represents a user. It contains the
 * following properties:
 * @param {string} role - The `role` parameter in the `createAccount` function is a string that
 * specifies the role of the user being created. It can have values such as "Admin", "User", or
 * "Driver". The function creates a new user account in the database with the provided user information
 * and assigns the specified
 * @returns The `createAccount` function is not explicitly returning anything. It is an asynchronous
 * function that performs database operations to create a user account, set user data, and set location
 * and driver data based on the provided user object and role. If the function runs successfully, it
 * will not return anything explicitly.
 */
export async function createAccount(user: User, role: string) {
  const docRef = doc(db, "users", user.uid);
  const locationsRef = ref(database, `locations/${user.uid}`);
  const driversRef = ref(database, `drivers/${user.uid}`);

  try {
    await setDoc(docRef, {
      name: user.displayName,
      email: user.email,
      userId: user.uid,
      role: role,
      isVerified: user.emailVerified,
    });

    await set(locationsRef, {
      userId: user.uid,
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
      role: role,
      isOnline: false,
      passenger: role === "Driver" ? 0 : null,
    });
  } catch (error) {
    console.log(error);
  }
}

/**
 * The function `updateLocation` updates the coordinates of a user's location in a Firebase database.
 * @param {number} latitude - Latitude is a geographic coordinate that specifies the north-south
 * position of a point on the Earth's surface. It is measured in degrees ranging from -90 to 90, with
 * positive values representing points north of the equator and negative values representing points
 * south of the equator.
 * @param {number} longitude - The `longitude` parameter in the `updateLocation` function represents
 * the longitudinal coordinate of a location. Longitudinal coordinates are imaginary lines that run
 * from the North Pole to the South Pole and are used to pinpoint a specific location on the Earth's
 * surface from east to west.
 * @returns If the `user` is not found (i.e., `user` is falsy), the function will return early and not
 * proceed with updating the location.
 */
export async function updateLocation(
  latitude: number | null,
  longitude: number | null
) {
  const user = auth.currentUser;

  if (!user) return;

  const locationRef = ref(database, `locations/${user.uid}`);

  update(locationRef, {
    coordinates: {
      latitude: latitude,
      longitude: longitude,
    },
    currentCoordinate: {
      latitude: latitude,
      longitude: longitude,
    },
  });
}

export async function updateAddress(address: string | "") {
  const user = auth.currentUser;

  if (!user) return;

  const locationRef = ref(database, `locations/${user.uid}`);

  update(locationRef, {
    address: address,
  });
}

export async function updateCurrentLocation(
  latitude: number | null,
  longitude: number | null
) {
  const user = auth.currentUser;

  if (!user) return;

  const locationRef = ref(database, `locations/${user.uid}`);

  await update(locationRef, {
    lastLoc: {
      latitude: latitude,
      longitude: longitude,
    },
  });
}

export async function updateOnline() {
  const user = auth.currentUser;

  if (!user) return;

  const locationRef = ref(database, `locations/${user.uid}`);

  await update(locationRef, {
    isOnline: false,
  });
}

export async function updatePassenger(value: number) {
  const user = auth.currentUser;

  if (!user) return;

  const locationRef = ref(database, `locations/${user.uid}`);

  await update(locationRef, {
    passengerCount: increment(value),
  })
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
}
