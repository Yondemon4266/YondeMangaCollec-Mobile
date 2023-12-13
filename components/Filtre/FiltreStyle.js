import { StyleSheet } from "react-native";
import {
  color1,
  color2,
  color3,
  color4,
  color5,
  colorManga,
} from "../../utils/Colors";

export const s = StyleSheet.create({
  container: {
    gap: 15,
    paddingHorizontal: "5%",
  },
  header: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
  },
  filterbutton: { width: 120, alignSelf: "center" },
  optionscontainer: {
    paddingVertical: 5,
    height: 120,
    paddingHorizontal: 5,
    marginTop: -40,
  },
  options: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  optionsselectedcontainer: {
    maxHeight: 120,
    marginBottom: 30,
    marginTop: -10,
  },
  optionsselected: {
    flexDirection: "row",
    gap: 2,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
  },
  tagtext: {
    color: color5,
    fontSize: 10,
  },
  tag: {
    borderWidth: 1,
    borderColor: color5,
    borderStyle: "dotted",

    borderRadius: 5,
  },
  tagGenre: {
    backgroundColor: color3,
  },
  tagStudio: {
    backgroundColor: colorManga,
  },
  tagstitlec: {
    alignSelf: "center",
    backgroundColor: color4,
    borderRadius: 10,
    padding: 5,
  },
  tagstitlet: {
    fontSize: 9,
    color: color5,
  },
});
