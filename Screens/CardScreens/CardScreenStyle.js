import { StyleSheet } from "react-native";
import { color3 } from "../../utils/Colors";
export const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  sousContainer: {
    flex: 1,
    gap: 15,
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
  loggedcomps: {
    paddingHorizontal: 30,
    gap: 10,
  },
  elementcontainer: {
    gap: 5,
    position: "relative",
  },
  element: {
    borderWidth: 1,
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 3,
  },
  submitbutton: {
    borderWidth: 1,
    alignSelf: "flex-start",
    borderRadius: 3,
    padding: 3,
    position: "absolute",
    right: -10,
    bottom: 35,
  },
});
