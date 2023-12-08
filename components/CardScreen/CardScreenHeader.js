import React from "react";
import { Image, ImageBackground, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { color5 } from "../../utils/Colors";
import { s } from "./CardScreenHeaderStyle";
export default function CardScreenHeader({ img, bigImg, navigation }) {
  return (
    <ImageBackground
      source={{ uri: bigImg }}
      style={s.bgImg}
      resizeMode="cover"
      blurRadius={5}
    >
      <Image source={{ uri: img }} style={s.img} resizeMode="contain" />
      <TouchableOpacity onPress={() => navigation.goBack()} style={s.backarrow}>
        <Ionicons name="arrow-back" size={38} color={color5} />
      </TouchableOpacity>
    </ImageBackground>
  );
}
