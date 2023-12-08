import { StyleSheet } from "react-native";
import {
  color2,
  color3,
  color4,
  colorManga,
  colorManga2,
} from "../../utils/Colors";

export const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: color4,
    paddingHorizontal: 10,
  },
  left: {
    gap: 5,
    justifyContent: "center",
    width: "45%",
  },
  center: {
    justifyContent: "center",
  },
  right: {
    position: "relative",
  },
  img: {
    width: 80,
    height: 100,
  },
  textimage: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: color2,
    width: "100%",
    textAlign: "center",
    fontSize: 11,
  },
  text: {
    fontSize: 12,
    fontFamily: "Literata-Regular",
  },
  text2: {
    fontSize: 12,
    fontFamily: "Literata-SemiBold",
  },
  lineseason: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: color3,
    height: 40,
  },
  lineseasonmanga: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorManga2,
    height: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
