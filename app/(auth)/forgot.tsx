import Button from "@/components/auth/Button";
import Input from "@/components/auth/InputComponent";
import { auth } from "@/firebaseConfig/firebase";
import { ErrorAlert } from "@/utils/utils";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Alert, StyleSheet, ToastAndroid, View } from "react-native";

const ForgotPage = () => {
  const [email, setEmail] = useState("");
  return (
    <View style={styles.container}>
      <Input
        iconName="email"
        placeholder="Enter your email"
        textContentType="emailAddress"
        inputMode="email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <Button
        label="Reset my password"
        onPress={() => {
          sendPasswordResetEmail(auth, email)
            .then(() => {
              ToastAndroid.showWithGravity(
                "Password Reset Link Sent!",
                ToastAndroid.LONG,
                ToastAndroid.TOP
              );
            })
            .catch((error: FirebaseError) => {
              ErrorAlert("Reset Password", error);
            });
        }}
      />
    </View>
  );
};

export default ForgotPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
