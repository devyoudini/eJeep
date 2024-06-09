import { RoleContext } from "@/auth/RoleContext";
import { AuthNavigation, CustomView, SignInForm } from "@/components";
import { styles } from "@/styles";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useContext } from "react";
import { View } from "react-native";
import Jeep from "@/assets/jeep.svg";

const SignIn = () => {
  const { updateRole } = useContext(RoleContext);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      updateRole("");
    }, [])
  );

  return (
    <CustomView>
      <View style={styles.container}>
        <Jeep width={100} height={100} style={{ marginBottom: 20 }} />
        <SignInForm />
        <AuthNavigation
          buttonLabel="Sign Up Now!"
          label="Doesn't have an account?"
          onPress={() => router.push("signup")}
        />
      </View>
    </CustomView>
  );
};

export default SignIn;
