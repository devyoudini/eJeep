import React from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";

const CustomView = ({ children }: { children: React.ReactNode }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior="height">
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomView;
