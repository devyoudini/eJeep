import { View, Text } from "react-native";
import React from "react";
import { styles } from "@/styles";
import { Marker } from "@/utils/hooks";

export default function PassengerCountDisplay({
  userInfo,
}: {
  userInfo: Marker[];
}) {
  if (!userInfo || userInfo.length === 0) return null;

  return (
    <View style={styles.passenger}>
      <Text style={styles.passengerfont}>
        Passenger: {userInfo[0].passengerCount}
      </Text>
    </View>
  );
}
