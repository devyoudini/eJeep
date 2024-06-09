import { useAuth } from "@/auth/AuthContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity } from "react-native";
import Button from "./Button";
import Input from "./InputComponent";

export default function SignInForm() {
  const { isLoading, signIn } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  function onSignIn() {
    const { noError, message } = formValidator(form.email, form.password);
    if (noError) {
      signIn(form.email, form.password);
    } else {
      Alert.alert("Sign In", message);
    }
  }

  return (
    <>
      <Input
        iconName="email"
        placeholder="Enter you email"
        textContentType="emailAddress"
        inputMode="email"
        value={form.email}
        onChangeText={(email) => {
          setForm({ ...form, email });
        }}
      />
      <Input
        iconName="password"
        placeholder="Enter your password"
        textContentType="password"
        inputMode="text"
        value={form.password}
        onChangeText={(password) => {
          setForm({ ...form, password });
        }}
        hidden
      />

      <TouchableOpacity
        style={{ alignSelf: "flex-end", marginRight: 40 }}
        onPress={() => {
          router.push("forgot");
        }}
      >
        <Text style={{ color: "gray", fontSize: 15 }}>Forgot password?</Text>
      </TouchableOpacity>

      {isLoading ? (
        <ActivityIndicator
          size={"large"}
          color={"black"}
          style={{ marginTop: 25 }}
        />
      ) : (
        <Button label="Sign In" onPress={onSignIn} />
      )}
    </>
  );
}

function formValidator(
  email: string,
  password: string
): {
  noError: boolean;
  message?: string;
} {
  let message: string = "Something went wrong.";

  if (!email || !password) {
    message = "Fill all the input fields!";
  } else {
    return { noError: true };
  }

  return { noError: false, message: message };
}
