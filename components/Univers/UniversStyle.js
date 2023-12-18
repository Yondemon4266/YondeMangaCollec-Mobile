import { Dimensions, StyleSheet } from "react-native";
import { color5 } from "../../utils/Colors";

const halfWidth = Dimensions.get("window").width / 2 - 30;
export const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  img: {
    width: halfWidth,
    height: 100,
    resizeMode: "cover",
  },
  button: {
    borderWidth: 1,
    borderRadius: 100,
    padding: 10,
  },
});
