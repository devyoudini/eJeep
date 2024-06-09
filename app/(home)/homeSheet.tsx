import { height } from "@/constants";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";

export default function HomeSheet() {
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
        // position: "relative",
      }}
      // elevation={5}
      // animated={false}

      defaultOverlayOpacity={0.4}
      gestureEnabled={true}
      closeAnimationConfig={{
        speed: 0.1,
      }}
      backgroundInteractionEnabled={true}
      closable={false}
      closeOnTouchBackdrop={false}
      springOffset={20}
      zIndex={1}
      snapPoints={[40]}
      disableDragBeyondMinimumSnapPoint
    >
      <View style={styles.container}>
        <Text>HomeSheet</Text>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height * 0.4,
  },
});
