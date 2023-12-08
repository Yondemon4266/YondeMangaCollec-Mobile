import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  headerContainer: {
    resizeMode: "cover",
    height: 250,
  },
  img: {
    width: 80,
    height: 80,
    position: "absolute",
    zIndex: 1,
  },
  img1: {
    top: 20,
    left: 0,
    transform: [{ rotate: "15deg" }],
  },
  img2: {
    top: 20,
    right: 0,
    transform: [{ rotate: "-15deg" }],
  },
  headerContent: {
    paddingTop: 50,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  headerLine: {
    flexDirection: "row",
    gap: 10,
    alignContent: "center",
  },
});
