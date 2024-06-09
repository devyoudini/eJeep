import { Dimensions, StatusBar } from "react-native";

export const { height, width } = Dimensions.get("window");

export const statusBar = StatusBar.currentHeight;
