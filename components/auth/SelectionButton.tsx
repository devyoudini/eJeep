import { RoleContext } from "@/auth/RoleContext";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SelectionButtonProps = {
  label?: string;
  onPress?: () => void;
};

const SelectionButton: React.FC<SelectionButtonProps> = ({
  label,
  onPress,
}) => {
  const { role } = useContext(RoleContext);

  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: role === label ? "#292929" : "white",
          },
        ]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.text,
            {
              color: role === label ? "white" : "black",
            },
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectionButton;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    alignItems: "center",
    paddingVertical: 20,
  },
});
