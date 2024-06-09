import { useAuth } from "@/auth/AuthContext";
import { RoleContext } from "@/auth/RoleContext";
import { styles } from "@/styles";
import React, { useContext, useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import Input from "./InputComponent";
import WeakPassword from "./WeakPassword";
import PasswordMismatch from "./PasswordMismatch";
import ModalButton from "./ModalButton";

export default function SignUpForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { role } = useContext(RoleContext);

  const { isLoading, signUp } = useAuth();

  function onSignUp() {
    const { noError, message } = formValidator(
      form.email,
      form.password,
      form.confirmPassword,
      role
    );

    if (noError) {
      signUp(form.email, form.password, role);
    } else {
      Alert.alert("Sign Up", message);
    }
  }
  return (
    <>
      <Input
        iconName="email"
        placeholder="youdini@gmail.com"
        textContentType={"emailAddress"}
        inputMode="email"
        onChangeText={(email) => setForm({ ...form, email })}
      />

      <Input
        iconName="password"
        placeholder="Enter your password"
        textContentType="password"
        inputMode="text"
        hidden
        onChangeText={(password) => setForm({ ...form, password })}
      />

      <WeakPassword password={form.password} />

      <Input
        iconName="password"
        placeholder="Confirm your password"
        textContentType="password"
        inputMode="text"
        hidden
        onChangeText={(confirmPassword) =>
          setForm({ ...form, confirmPassword })
        }
      />

      <PasswordMismatch
        password={form.password}
        confirmPassword={form.confirmPassword}
      />

      <ModalButton
        onPress={() => { 
          SheetManager.show("roleSelectSheet");
        }}
        value={role}
      />

      {isLoading ? (
        <ActivityIndicator
          size={"large"}
          color={"black"}
          style={{ marginTop: 25 }}
        />
      ) : (
        <TouchableOpacity style={styles.button} onPress={onSignUp}>
          <Text style={{ color: "white", fontSize: 16 }}>Sign Up</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

function formValidator(
  email: string,
  password: string,
  confirmPassword?: string,
  role?: string
): {
  noError: boolean;
  message?: string;
} {
  let message: string = "Something went wrong.";

  if (!email || !password || !confirmPassword) {
    message = "Fill all the input fields!";
  } else if (password !== confirmPassword) {
    message = "Password do not match.";
  } else if (password.length < 7) {
    message = "Weak password. Password must be atleast 8 characters.";
  } else if (!role) {
    message = "Please select a role.";
  } else {
    return { noError: true };
  }

  return { noError: false, message: message };
}
