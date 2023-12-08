import { StyleSheet } from "react-native";
import { color2 } from "../../utils/Colors";
export const s = StyleSheet.create({
  tagC: {
    flexDirection: "row",
    backgroundColor: color2,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    margin: 3,
  },
  tagText: {
    fontSize: 12,
    fontFamily: "Literata-Regular",
    textAlign: "center",
  },
});
