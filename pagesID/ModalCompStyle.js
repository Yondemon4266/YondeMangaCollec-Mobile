import { Dimensions, StyleSheet } from "react-native";
import { color1, color2, color5 } from "../utils/Colors";

const halfWidth = Dimensions.get("window").width / 1.3;
export const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sscontainer: {
    backgroundColor: color5,
    width: halfWidth,
    borderRadius: 20,
    gap: 25,
  },
  top: { padding: 20, paddingBottom: 0 },
  center: {
    paddingHorizontal: 30,
    alignItems: "center",
    gap: 10,
  },
  input: {
    borderRadius: 5,
    backgroundColor: color2,
    width: "100%",
    color: "grey",
    height: 35,
    paddingHorizontal: 15,
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomtext: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: color2,
    width: halfWidth / 2,
    borderBottomWidth: 0,
    textAlign: "center",
    padding: 15,
    borderLeftWidth: 0,
  },
  bottomtext1: {
    borderRightWidth: 1,
  },
  bottomtext2: {
    borderRightWidth: 0,
    color: color1,
  },
  error: {
    color: color1,
    textAlign: "center",
    fontSize: 12,
  },
  success: {
    color: "green",
    textAlign: "center",
    fontSize: 12,
  },
});
