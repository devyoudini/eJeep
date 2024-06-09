import React from "react";
import { Text } from "react-native";

export default function WeakPassword({ password }: { password: string }) {
  if (password.length > 7) {
    return null;
  }
  return (
    <Text
      style={{
        color: "red",
        fontSize: 10,
        alignSelf: "baseline",
        marginLeft: 40,
      }}
    >
      your password is weak! (atleat 8 characters)
    </Text>
  );
}
