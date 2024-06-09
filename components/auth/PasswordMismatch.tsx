import { Text } from "react-native";
import React from "react";

interface PasswordMismatchProps {
  password: string;
  confirmPassword: string;
}

export default function PasswordMismatch({
  password,
  confirmPassword,
}: PasswordMismatchProps) {
  if (password === confirmPassword) {
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
      password do not match!
    </Text>
  );
}
