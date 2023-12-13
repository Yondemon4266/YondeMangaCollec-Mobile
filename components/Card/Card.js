import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { s } from "../Card/CardStyle";
import TextTruncate from "../../Hooks/TextTruncate";
import Tag from "../Tags/Tag";
import { color3, color5, colorManga } from "../../utils/Colors";
export default function Card({ data, navigation, styl, imgstyl, textstyl, anime }) {
  
  return (
    <View style={[s.cardcontainer, styl]}>
      <TouchableOpacity
        onPress={() => navigation.navigate( "CardScreen", { data: data })}
      >
        <Image
          source={{ uri: data.images.jpg.image_url }}
          style={[s.img, imgstyl]}
        />
        {TextTruncate(data.title, textstyl)}
        <Tag
          v={
            anime
              ? { backgroundColor: color3, alignSelf: "center" }
              : { backgroundColor: colorManga, alignSelf: "center" }
          }
          t={{ color: color5 }}
        >
          {data.type ? data.type : "?"}
        </Tag>
      </TouchableOpacity>
    </View>
  );
};
