import { Button } from "@/components";
import { useLocation } from "@/utils/hooks";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const PermissionPage = () => {
  const { isLoading, onLocationRequest } = useLocation();

  return (
    <View style={styles.container}>
      <Text>eJeep needs your location.</Text>

      {isLoading ? (
        <ActivityIndicator
          size={"large"}
          color={"black"}
          style={{ marginTop: 10 }}
        />
      ) : (
        <Button
          label="Allow location"
          onPress={() => {
            onLocationRequest();
          }}
        />
      )}
    </View>
  );
};

export default PermissionPage;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
