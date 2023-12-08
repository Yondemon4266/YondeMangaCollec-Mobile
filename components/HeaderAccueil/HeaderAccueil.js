import React from "react";
import { View, Image, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import logo from "../../assets/logoappadaptive.png";
import { s } from "../HeaderAccueil/HeaderAccueilStyle";
import gif from "../../assets/demonslayerGIF1.gif";
import Txt from "../Text/Txt";

export default function HeaderAccueil() {
  const color = "white";
  return (
    <ImageBackground source={gif} style={s.headerContainer}>
      <LinearGradient
        colors={["rgba(0,0,0,0.55)", "transparent"]}
        start={{ x: 0.5, y: 0.45 }}
        end={{ x: 0.5, y: 0.1 }}
      >
        <Image source={logo} style={[s.img, s.img1]} />
        <Image source={logo} style={[s.img, s.img2]} />
        <View style={s.headerContent}>
          <View>
            <Txt
              styles={{
                fontSize: 22,
                fontFamily: "Literata-SemiBold",
                color,
              }}
            >
              HinoKuni Anime
            </Txt>
          </View>
          <View style={s.headerLine}>
            <Ionicons name="checkmark-circle-outline" size={24} color={color} />
            <Txt styles={{ color }}>Managez votre propre bibliothèque</Txt>
          </View>
          <View style={s.headerLine}>
            <Ionicons name="checkmark-circle-outline" size={24} color={color} />
            <Txt styles={{ color }}>
              Ne loupez plus aucune sortie manga et animé
            </Txt>
          </View>
          <View style={s.headerLine}>
            <Ionicons name="checkmark-circle-outline" size={24} color={color} />
            <Txt styles={{ color }}>
              Collectionnez nos cartes personnalisées
            </Txt>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}
