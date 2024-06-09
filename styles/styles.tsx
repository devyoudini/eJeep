import { StyleSheet } from "react-native";
import { height, statusBar } from "@/constants/dimension";

export const styles = StyleSheet.create({
  container: {
    height: height - 100,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 30,
    marginTop: 10,
    borderColor: "#e2e2e2",
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    backgroundColor: "#292929",
    borderRadius: 99,
    marginTop: 20,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  menu: {
    position: "absolute",
    top: statusBar ? statusBar + 20 : 55,
    left: 20,
    backgroundColor: "white",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 99,
    elevation: 10,
  },
  content: {
    marginTop: -30,
    height: height * 0.4,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    elevation: 10,
    paddingTop: 10,
    bottom: 0,
    width: "100%",
  },
  position: {
    position: "absolute",
    bottom: 40,
    right: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 99,
    elevation: 10,
  },
  containerLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e3e3e3",
  },
  indicator: {
    backgroundColor: "#e1e1e1",
    width: 80,
    height: 80,
    borderRadius: 10,
    elevation: 8,
  },
  passenger: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 99,
    top: statusBar ? statusBar + 20 : 55,
    padding: 10,
    left: 70,
    justifyContent: "center",
    elevation: 7,
    
  },
  passengerfont: {
    fontSize: 15,
    fontWeight: "bold",
    includeFontPadding: true,
  },
});
