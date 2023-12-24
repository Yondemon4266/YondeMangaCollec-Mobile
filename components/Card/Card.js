import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { s } from "../Card/CardStyle";
import TextTruncate from "../../Hooks/TextTruncate";
import Tag from "../Tags/Tag";
import { color1, color3, color5, colorManga } from "../../utils/Colors";
import { AntDesign } from "@expo/vector-icons";
export default function Card({
  data,
  navigation,
  styl,
  imgstyl,
  textstyl,
  isInCollection,
  isFriendPage,
  friendData,
}) {
  return (
    <View style={[s.cardcontainer, styl]}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CardScreen", {
            data: data,
            isFriendPage: isFriendPage,
            friendData: friendData,
          })
        }
      >
        <Image
          source={{ uri: data.images.jpg.image_url }}
          style={[s.img, imgstyl]}
        />
        {TextTruncate(data.title, textstyl)}
        <Tag
          v={
            data.type === "TV"
              ? { backgroundColor: color3, alignSelf: "center" }
              : { backgroundColor: colorManga, alignSelf: "center" }
          }
          t={{ color: color5 }}
        >
          {data.type ? data.type : "?"}
        </Tag>
        {isInCollection && (
          <AntDesign
            name="star"
            size={24}
            color={color3}
            style={{ position: "absolute", top: -10, left: -10 }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};
