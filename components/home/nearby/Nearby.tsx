import { width } from "@/constants";
import { Marker } from "@/utils/hooks";
import React from "react";
import { Text, View } from "react-native";

export default function Nearby({ item }: { item: Marker }) {
  return (
    <View
      style={{
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <View
        style={{
          width: width - 50,
          paddingVertical: 20,
          paddingHorizontal: 10,
          backgroundColor: "#fafafa",
          borderRadius: 15,
          elevation: 4,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Location</Text>
        <Text style={{ marginLeft: 20, marginBottom: 20 }}>{item.address}</Text>
        {item.role === "Driver" ? (
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Passengers: {item.passengerCount}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
