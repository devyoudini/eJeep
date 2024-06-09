import { SignOutSVG } from "@/assets";
import { useAuth } from "@/auth/AuthContext";
import { Button } from "@/components";
import { updateOnline } from "@/utils/authFunctions";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

const SignOutSheet = () => {
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ActionSheet
      useBottomSafeAreaPadding={true}
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
        <Text style={styles.title}>Sign Out</Text>
        <SignOutSVG
          width={"80%"}
          // style={{ backgroundColor: "red" }}
          height={200}
        />
        {!isLoading ? (
          <Button
            label="Sign me out"
            onPress={() => {
              setIsLoading(true);
              setTimeout(() => {
                SheetManager.hide("signoutSheet");
                setIsLoading(false);
                updateOnline().then(() => {
                  logout();
                });
              }, 1500);
            }}
          />
        ) : (
          <ActivityIndicator
            size={"large"}
            color={"black"}
            style={{ marginTop: 25 }}
          />
        )}
      </View>
    </ActionSheet>
  );
};

export default SignOutSheet;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
