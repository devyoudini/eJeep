import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type ModalButtonProps = {
  onPress?: () => void;
  value?: string;
};

const ModalButton: React.FC<ModalButtonProps> = ({ onPress, value }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <MaterialCommunityIcons
          name="account"
          size={24}
          color="gray"
          style={styles.icon}
        />

        <Text
          style={{
            includeFontPadding: true,
            fontSize: 16,
            color: value ? "black" : "gray",
          }}
        >
          {value ? value : "Select your role:"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
  },
  button: {
    marginHorizontal: 30,
    paddingVertical: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e2e2e2",
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
  },
  icon: { marginRight: 10 },
});
