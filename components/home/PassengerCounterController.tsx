import { updatePassenger } from "@/utils/authFunctions";
import { Marker } from "@/utils/hooks";
import React from "react";
import { View } from "react-native";
import PassengerCounterButton from "./PassengerCounterButton";

export default function PassengerCounterController({
  userInfo,
}: {
  userInfo: Marker[];
}) {
  if (!userInfo || userInfo.length === 0) return null;

  return (
    <View
      style={{
        position: "absolute",
        right: 20,
        bottom: 150,
        gap: 10,
      }}
    >
      <PassengerCounterButton
        label="+"
        onPress={() => {
          updatePassenger(1);
        }}
        disabled={userInfo[0].passengerCount === 30 ? true : false}
        fontStyle={{ fontWeight: "bold", color: "#fff" }}
        style={{
          backgroundColor:
            userInfo[0].passengerCount === 30 ? "#808080" : "#21BF73",
        }}
      />
      <PassengerCounterButton
        label="-"
        onPress={() => {
          updatePassenger(-1);
        }}
        disabled={userInfo[0].passengerCount === 0 ? true : false}
        fontStyle={{ fontWeight: "bold", color: "#fff" }}
        style={{
          backgroundColor:
            userInfo[0].passengerCount === 0 ? "#808080" : "#DF2E38",
        }}
      />
    </View>
  );
}
