import { StyleSheet } from "react-native";
import { color1, color5 } from "../../utils/Colors";

export const s = StyleSheet.create({
  button: {
    flexDirection: "row",
    gap: 5,
    backgroundColor: color1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  buttonText: {
    color: color5,
    textAlign: "center",
    fontSize: 14,
  },
});
