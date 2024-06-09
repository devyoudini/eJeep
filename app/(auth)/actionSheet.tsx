import { RoleContext } from "@/auth/RoleContext";
import { SelectionButton } from "@/components";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

const RoleSelectSheet = () => {
  const { updateRole } = useContext(RoleContext);
  return (
    <ActionSheet
      useBottomSafeAreaPadding={true}
      headerAlwaysVisible={true}
      indicatorStyle={{
        backgroundColor: "black",
        width: 70,
      }}
      containerStyle={{
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}
      elevation={4}
      defaultOverlayOpacity={0.4}
      gestureEnabled={true}
      closeAnimationConfig={{
        speed: 0.1,
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Select your role:</Text>
        <SelectionButton
          label="Driver"
          onPress={() => {
            updateRole("Driver");
            SheetManager.hide("roleSelectSheet");
          }}
        />
        <SelectionButton
          label="Passenger"
          onPress={() => {
            updateRole("Passenger");
            SheetManager.hide("roleSelectSheet");
          }}
        />
      </View>
    </ActionSheet>
  );
};

export default RoleSelectSheet;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    paddingVertical: 10,
    alignItems: "center",
  },
});
