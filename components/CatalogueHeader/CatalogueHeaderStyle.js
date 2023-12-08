import { Dimensions, StyleSheet } from "react-native";

const imgSize = 130;
const halfImgSize = imgSize / 2;
const decalageImg = halfImgSize - 15;
export const s = StyleSheet.create({
  container: {
    gap: 15,
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
    fontSize: 16,
    textAlign: "center",
  },
  text: {
    fontSize: 13,
    textAlign: "center",
  },
});
