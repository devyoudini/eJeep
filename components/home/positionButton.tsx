import { styles } from "@/styles/styles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function PositionButton(props: { onPress(): void }) {
  return (
    <TouchableOpacity style={styles.position} onPress={props.onPress} id="">
      <Ionicons name="locate" size={24} />
    </TouchableOpacity>
  );
}
