import { Dimensions, StyleSheet } from "react-native";
import { color2, color4 } from "../../utils/Colors";

const imgSize = 130;
const halfImgSize = imgSize / 2;
const decalageImg = halfImgSize - 15;
const halfWidth = Dimensions.get("window").width / 2;
const padH = 10;

export const s = StyleSheet.create({
  container: {
    gap: 15,
    borderBottomWidth: 1,
    borderBottomColor: color2,
    paddingBottom: 15,
  },

  bg: {
    position: "relative",
    width: "100%",
    height: 220,
  },
  img: {
    position: "absolute",
    bottom: -decalageImg,
    left: Dimensions.get("window").width / 2 - halfImgSize,
    width: imgSize,
    height: imgSize,
    borderRadius: 600,
  },
  infos: {
    marginTop: decalageImg,
    gap: 5,
  },
  title: {
    fontFamily: "Literata-SemiBold",
    fontSize: 18,
    textAlign: "center",
  },
  text: {
    fontSize: 15,
    textAlign: "center",
  },
  texttitle: {
    fontFamily: "Literata-Regular",
    fontSize: 15,
  },
  text2: {
    fontSize: 16,
  },
  lines: {
    gap: 10,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: color2,
    gap: 5,
    paddingBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    marginHorizontal: padH,
    justifyContent: "space-between",
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  searchbarfilters: {
    backgroundColor: color2,
    height: 35,
    // Pour que la searchbar prenne bien la bonne taille dans tous les écrans;
    width: halfWidth - (padH + 5 * 2 + 20),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 0,
  },
  searchbarfiltersinput: {
    height: 30,
    backgroundColor: color2,
  },
  searchbartext: {
    fontSize: 9,
    fontFamily: "Literata-Regular",
    color: color4,
  },
  searchbaricon: {
    width: 18,
    height: 18,
  },
  buttons: {
    flexDirection: "row",
    gap: 20,
    alignSelf: "center",
    marginLeft: 20,
  },
});
