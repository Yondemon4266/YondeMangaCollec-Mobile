import { Dimensions, StyleSheet } from "react-native";
import { color1, color2, color3, color4, color5 } from "../../utils/Colors";

const imgSize = 130;
const halfImgSize = imgSize / 2;
const fullWidth = Dimensions.get("window").width;
const halfWidth = fullWidth / 2;
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
  buttonimg: {
    position: "absolute",
    top: 130,
    left: Dimensions.get("window").width / 2 - halfImgSize,
  },
  img: {
    width: imgSize,
    height: imgSize,
    borderRadius: 600,
  },
  imgcatalogue: {
    width: imgSize,
    height: imgSize,
    borderRadius: 600,
    position: "absolute",
    top: 130,
    left: Dimensions.get("window").width / 2 - halfImgSize,
  },
  infos: {
    marginTop: 30,
    gap: 5,
  },
  title: {
    fontFamily: "Literata-SemiBold",
    fontSize: 18,
    textAlign: "center",
  },
  level: {
    fontSize: 16,
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
    position: "relative",
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  searchlist: {
    position: "absolute",
    bottom: 50,
    left: 35,
    maxHeight: 130,
    width: fullWidth - 80,
    backgroundColor: color5,
    zIndex: 50,
    borderRadius: 5,
  },
  searchelement: {
    borderTopWidth: 3,
    borderTopColor: color3,
    padding: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: "row",
    width: "100%",
    height: 60,
    gap: 5,
  },
  littleimg: {
    height: 50,
    width: "30%",
    alignSelf: "center",
  },
  searchelementright: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "70%",
    paddingRight: 5,
  },
  elementinright: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textelement1: {
    fontSize: 11,
    fontFamily: "Literata-SemiBold",
  },
  textelement2: {
    fontSize: 10,
  },
  shadowAndroid: {
    elevation: 10,
  },
  shadowIOS: {
    shadowColor: "#333333",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.7,
    shadowRadius: 4,
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
