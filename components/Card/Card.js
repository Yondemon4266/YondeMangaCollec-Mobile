import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { s } from "../Card/CardStyle";
import TextTruncate from "../../Hooks/TextTruncate";
export default function Card({ data, navigation, styl, imgstyl, textstyl }) {
  return (
    <View style={[s.cardcontainer, styl]}>
      <TouchableOpacity
        onPress={() => navigation.navigate("CardScreen", { data: data })}
      >
        <Image
          source={{ uri: data.images.jpg.image_url }}
          style={[s.img, imgstyl]}
        />
        {TextTruncate(data.title, textstyl)}
      </TouchableOpacity>
    </View>
  );
}
