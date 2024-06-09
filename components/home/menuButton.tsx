import { styles } from "@/styles/styles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

export default function MenuButton() {
  return (
    <TouchableOpacity
      onPress={() => {
        SheetManager.show("signoutSheet");
      }}
      style={styles.menu}
    >
      <Ionicons
        name="menu"
        size={24}
        color="black"
        // style={{ marginTop: 1 }}
      />
    </TouchableOpacity>
  );
}
