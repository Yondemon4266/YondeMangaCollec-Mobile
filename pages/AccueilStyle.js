import { StyleSheet } from "react-native";
import { color1 } from "../utils/Colors";

export const s = StyleSheet.create({
  text: {
    fontSize: 18,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: color1,
    marginBottom: 10,
    paddingLeft: 15,
    paddingBottom: 5,
  },
  text2: {
    display: "flex",
  },
  cardlist: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  loading: {
    flex: 1,
  },
});
