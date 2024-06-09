import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

type ButtonProps = {
  label?: string;
  onPress?: () => void;
};

const Button: React.FunctionComponent<ButtonProps> = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={{ color: "white", fontSize: 16 }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    backgroundColor: "#292929",
    borderRadius: 99,
    marginTop: 20,
  },
});
