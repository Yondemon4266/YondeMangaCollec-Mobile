import { StyleSheet } from "react-native";
import { color3 } from "../../utils/Colors";
export const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  sousContainer: {
    flex: 1,
    gap: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: "Literata-SemiBold",
    textAlign: "center",
    paddingHorizontal: 50,
  },
  title2: {
    fontSize: 16,
    fontFamily: "Literata-Medium",
    paddingHorizontal: 60,
    color: color3,
    textAlign: "center",
  },
  tagsContainer: {
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  synopsis: {
    paddingHorizontal: 30,
    alignSelf: "center",
    maxHeight: 170,
  },
});
