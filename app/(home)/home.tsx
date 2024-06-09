import { useAuth } from "@/auth/AuthContext";
import { MapComponent, MenuButton } from "@/components";
import Nearby from "@/components/home/nearby/Nearby";
import { width } from "@/constants";
import { styles } from "@/styles/styles";
import { getUserInfo, useOnDisconnectClearLocation } from "@/utils/hooks";
import React from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import PermissionPage from "./permission";

export default function Home() {
  const { locationEnabled } = useAuth();
  const { user, datas } = getUserInfo();

  useOnDisconnectClearLocation();

  return (
    <SafeAreaView style={styles.mapContainer}>
      {locationEnabled ? (
        <View style={styles.mapContainer}>
          <MapComponent datas={datas} info={user} />
        </View>
      ) : (
        <PermissionPage />
      )}

      <View style={styles.content}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
          Nearby
        </Text>

        {datas.length === 0 ? (
          <View>
            <Text style={{ color: "gray" }}>
              No Nearby {user?.role === "Driver" ? "Passengers" : "Driver"}
            </Text>
          </View>
        ) : (
          <FlatList
            data={datas}
            renderItem={({ item }) => {
              return <Nearby item={item} />;
            }}
            showsVerticalScrollIndicator={false}
            style={{ width: width }}
          />
        )}
      </View>

      <MenuButton />
    </SafeAreaView>
  );
}
