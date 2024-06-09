import { AuthNavigation, CustomView, SignUpForm } from "@/components";
import { styles } from "@/styles/styles";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

const SignUp = () => {
  const router = useRouter();
  return (
    <CustomView>
      <View style={styles.container}>
        <SignUpForm />
        <AuthNavigation
          buttonLabel="Sign In Now!"
          label="Already have an account?"
          onPress={router.back}
        />
      </View>
    </CustomView>
  );
};

export default SignUp;
