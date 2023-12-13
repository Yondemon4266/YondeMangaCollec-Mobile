import React, { useState } from "react";
import { ImageBackground, View, Image } from "react-native";
import { s } from "./CatalogueHeaderStyle";
import bg from "../../assets/onizukabg.jpg";
import img from "../../assets/onizuka.jpg";
import Txt from "../Text/Txt";
import * as Progress from "react-native-progress";
import { SearchBar } from "@rneui/themed";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { color4 } from "../../utils/Colors";
import ButtonComp from "../Button/ButtonComp";
import chibiIcon from "../../assets/images/megumichibipng.png";
export default function CatalogueHeader() {
  const [searchElement, setSearchElement] = useState("");
  const [searchFriend, setSearchFriend] = useState("");
  const iconSize = 20;

  function UpdateFriendSearch(text) {
    setSearchFriend(text);
  }
  function ClearFriendSearch() {
    setSearchFriend("");
  }
  function UpdateElementSearch(text) {
    setSearchElement(text);
  }
  function ClearElementSearch() {
    setSearchElement("");
  }
  return (
    <View style={s.container}>
      <ImageBackground source={bg} resizeMode="cover" style={s.bg}>
        <Image source={img} style={s.img} />
      </ImageBackground>
      <View style={s.infos}>
        <Txt styles={s.title}>Yondemon</Txt>
        <Txt styles={s.text}>Hokage du village caché de la Feuille</Txt>
        <Txt styles={s.text}>Membre depuis le 05/11/2023</Txt>
        <Txt styles={s.text}>Niveau 100</Txt>
        <Progress.Bar
          progress={0.9}
          animated={false}
          width={180}
          height={14}
          borderRadius={20}
          style={{ alignSelf: "center" }}
        />
      </View>
      <View style={s.searchContainer}>
        <View style={s.search}>
          <Ionicons name="book-outline" size={iconSize} color={color4} />
          <SearchBar
            placeholder="Rechercher une oeuvre..."
            containerStyle={s.searchbarfilters}
            inputContainerStyle={s.searchbarfiltersinput}
            inputStyle={s.searchbartext}
            leftIconContainerStyle={s.searchbaricon}
            lightTheme={true}
            onChangeText={UpdateElementSearch}
            value={searchElement}
            onClear={ClearElementSearch}
          />
        </View>
        <View style={s.search}>
          <MaterialIcons name="group" size={iconSize} color={color4} />
          <SearchBar
            placeholder="Rechercher un ami..."
            containerStyle={s.searchbarfilters}
            inputContainerStyle={s.searchbarfiltersinput}
            inputStyle={s.searchbartext}
            leftIconContainerStyle={s.searchbaricon}
            lightTheme={true}
            onChangeText={UpdateFriendSearch}
            value={searchFriend}
            onClear={ClearFriendSearch}
          />
        </View>
      </View>
      <View style={s.buttons}>
        <ButtonComp styl={{ alignSelf: "center" }}>Voir Cartes</ButtonComp>
        <ButtonComp styl={{ alignSelf: "center" }}>Comparer</ButtonComp>
      </View>
    </View>
  );
}
