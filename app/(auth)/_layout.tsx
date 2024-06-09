import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name="signin"
        options={{
          title: "Sign In",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: "Sign Up",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="forgot"
        options={{
          title: "Reset your password",
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
