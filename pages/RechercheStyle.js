import { StyleSheet } from "react-native";
import { color2 } from "../utils/Colors";

export const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "column",
    marginVertical: 10,
    paddingHorizontal: 30,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: color2,
    paddingBottom: 10,
  },
  animemanga: {
    width: "30%",
    alignSelf: "center",
  },
});
