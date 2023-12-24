import { Dimensions, StyleSheet } from "react-native";

const halfWidth = Dimensions.get("window").width / 2 - 20;
export const s = StyleSheet.create({
  cardcontainer: {
    flexDirection: "column",
    gap: 3,
    margin: 3,
  },
  img: {
    width: halfWidth,
    height: 200,
  },
});
