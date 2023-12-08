import { StyleSheet } from "react-native";
import { color1, color2, color3, color5 } from "../../utils/Colors";

export const s = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    gap: 0,
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: color2,
  },
  calendriertext: {
    fontSize: 16,
    fontFamily: "Literata-SemiBold",
  },
  button: {
    borderRadius: 0,
  },
  animemanga: {
    flexDirection: "row",
    gap: 0,
    justifyContent: "center",
  },
});
