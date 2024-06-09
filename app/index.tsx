import { styles } from "@/styles/styles";
import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function LoadingPage() {
  return (
    <View style={styles.containerLoading}>
      <ActivityIndicator
        style={styles.indicator}
        color={"black"}
        size={"large"}
      />
    </View>
  );
}
