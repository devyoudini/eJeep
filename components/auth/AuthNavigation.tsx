import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface AuthNavigationProps {
  label: string;
  buttonLabel: string;
  onPress(): void;
}

export default function AuthNavigation({
  label,
  buttonLabel,
  onPress,
}: AuthNavigationProps) {
  return (
    <View
      style={{
        alignItems: "center",
        position: "absolute",
        bottom: 30,
      }}
    >
      <Text style={{ color: "gray" }}>{label}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={{ color: "black", fontSize: 15 }}>{buttonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
