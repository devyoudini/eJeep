import { FirebaseError } from "firebase/app";
import { Alert } from "react-native";
import { Marker } from "./hooks";
import { useState } from "react";
import { auth } from "@/firebaseConfig/firebase";

/**
 * The function ErrorAlert takes a title and a FirebaseError as input, and returns an alert message
 * based on the error code.
 * @param {string} title - The `title` parameter is a string that represents the title or heading of
 * the error alert that will be displayed.
 * @param {FirebaseError} error - The `error` parameter in the `ErrorAlert` function is of type
 * `FirebaseError`. This indicates that the function expects an error object that conforms to the
 * structure defined by Firebase for errors. The function then checks the `code` property of the error
 * object to determine the specific type of error that
 * @returns The function `ErrorAlert` is returning an alert with the specified `title` and `message`
 * based on the Firebase error code provided. If the error code matches one of the predefined cases
 * ("auth/invalid-email", "auth/invalid-credential", "auth/email-already-in-use"), a specific message
 * is displayed. Otherwise, the error message from the Firebase error object is displayed.
 */
export function ErrorAlert(title: string, error: FirebaseError) {
  let message: string = "Something went wrong.";

  if (error.code == "auth/invalid-email") {
    message = "Invalid email address.";
  } else if (error.code == "auth/invalid-credential") {
    message =
      "Invalid credentials. Check your email or password if it is correct.";
  } else if (error.code == "auth/email-already-in-use") {
    message = "The provided email is already in use by an existing user.";
  } else if (error.code == "auth/missing-email") {
    message = "Provide a valid email address.";
  } else {
    message = error.message;
  }

  return Alert.alert(title, message);
}

export function NearbyDataChecker(item: Marker) {
  const [empty, setEmpty] = useState(true);
  const user = auth.currentUser;

  if (!user) setEmpty(true);

  if (!item.isOnline) setEmpty(true);

  return empty;
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
