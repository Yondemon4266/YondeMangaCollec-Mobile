import { StyleSheet } from "react-native";
import { color2, color4 } from "../../utils/Colors";

export const searchbarStyle = StyleSheet.create({
  searchbarfilters: {
    backgroundColor: color2,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  searchbarfiltersinput: {
    height: 30,
    backgroundColor: color2,
  },
  searchbartext: {
    fontSize: 11,
    fontFamily: "Literata-Regular",
    color: color4,
  },
});
