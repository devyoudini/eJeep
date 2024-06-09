import "expo-dev-client";
import { AuthContextProvider, useAuth } from "@/auth/AuthContext";
import { RoleContextProvider } from "@/auth/RoleContext";
import { Slot, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { SheetProvider } from "react-native-actions-sheet";
import "./(sheets)/sheets";

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <RoleContextProvider>
        <SheetProvider>
          <MainLayout />
        </SheetProvider>
      </RoleContextProvider>
    </AuthContextProvider>
  );
}

function MainLayout() {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (typeof isAuthenticated == "undefined") return;

    const inApp = segments[0] == "(home)";
    if (isAuthenticated && !inApp) {
      //  redirect to home

      router.replace("home");
    } else if (isAuthenticated == false) {
      // redirect to signin

      router.replace("signin");
    }
  }, [isAuthenticated]);

  return <Slot />;
}
