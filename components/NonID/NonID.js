import React from "react";
import { Image, View, TouchableOpacity, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./NonIDStyle";
import logo from "../../assets/logoappadaptive.png";
import Txt from "../Text/Txt";
import ButtonComp from "../Button/ButtonComp";
import { color3 } from "../../utils/Colors";
export default function NonID({ navigation }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={s.container}>
        <View style={s.header}>
          <Txt styles={{ fontSize: 22, fontFamily: "Literata-Regular" }}>
            Bienvenu cher Otaku !
          </Txt>
        </View>
        <Image source={logo} style={s.logo} />
        <View style={s.footer}>
          <Txt styles={{ textAlign: "center", fontSize: 15 }}>
            Inscrivez vous gratuitement et recevez une de nos cartes
            personnalisées
          </Txt>
          <ButtonComp
            styl={{ borderRadius: 20, backgroundColor: color3 }}
            onPress={() => navigation.navigate("CompteStack")}
          >
            S'INSCRIRE
          </ButtonComp>
          <Txt styles={{ textAlign: "center", fontSize: 15 }}>
            Connectez vous à votre compte HinoKuni pour accéder à votre
            catalogue et découvrir nos fonctionnalités !
          </Txt>
          <ButtonComp
            styl={{ borderRadius: 20, backgroundColor: color3 }}
            onPress={() => navigation.navigate("CompteStack")}
          >
            SE CONNECTER
          </ButtonComp>
          <TouchableOpacity onPress={() => navigation.navigate("Accueil")}>
            <Text style={s.subtext}>Continuer sans se connecter</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
