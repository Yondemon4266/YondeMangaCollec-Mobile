import { Dimensions, StyleSheet } from "react-native";
import { color5 } from "../../utils/Colors";

const halfWidth = Dimensions.get("window").width / 2 - 30;
export const s = StyleSheet.create({
  container: {
    marginVertical: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  img: {
    width: halfWidth,
    height: 120,
    resizeMode: "cover",
  },
  text: {
    fontSize: 14,
    textAlign: "center",
  },
  scrollview: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
