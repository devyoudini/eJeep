import React from "react";
import { Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

export default function PassengerCounterButton({
  label,
  onPress,
  style,
  fontStyle,
  disabled,
}: {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  fontStyle?: TextStyle;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#fff",
        borderRadius: 10,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        elevation: 15,
        ...style,
      }}
      disabled={disabled}
    >
      <Text style={{ fontSize: 20, ...fontStyle }}>{label}</Text>
    </TouchableOpacity>
  );
}
