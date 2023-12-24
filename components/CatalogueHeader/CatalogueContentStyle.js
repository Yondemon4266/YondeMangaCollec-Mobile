import { Dimensions, StyleSheet } from "react-native";
import { color1, color2, color3, color4, color5 } from "../../utils/Colors";

export const s = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
  },
  friendColor: {
    backgroundColor: "#FFEBE9",
  },
  friendTextColor: {
    backgroundColor: "#FF9398",
  },
  commonColor: {
    backgroundColor: "#E6FFEC",
  },
  commonTextColor: {
    backgroundColor: "#B6ECC5",
  },
  userColor: {
    backgroundColor: "#CF7777",
  },
  userTextColor: {
    backgroundColor: "#CF000A",
    color: color5,
  },
  cardcontainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  text: {
    textAlign: "center",
    borderRadius: 7,
    margin: 10,
    padding: 5,
  },
});
