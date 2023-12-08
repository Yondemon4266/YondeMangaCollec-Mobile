import React from "react";
import { ImageBackground, View, Image } from "react-native";
import { s } from "./CatalogueHeaderStyle";
import bg from "../../assets/onizukabg.jpg";
import img from "../../assets/onizuka.jpg";
import Txt from "../Text/Txt";
import BarNiveau from "../BarNiveau/BarNiveau";

export default function CatalogueHeader() {
  return (
    <View style={s.container}>
      <ImageBackground source={bg} resizeMode="cover" style={s.bg}>
        <Image source={img} style={s.img} />
      </ImageBackground>
      <View style={s.infos}>
        <Txt styles={s.title}>Yondemon</Txt>
        <Txt styles={s.text}>Hokage du village caché de Konoha</Txt>
        <Txt styles={s.text}>Membre depuis le 05/11/2023</Txt>
        <Txt styles={s.text}>Niveau 100</Txt>
        <BarNiveau />
      </View>
    </View>
  );
}
