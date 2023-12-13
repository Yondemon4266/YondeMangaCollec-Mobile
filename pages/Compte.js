import React, { useState } from "react";
import { Button, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import ButtonComp from "../components/Button/ButtonComp";
import { s } from "./CompteStyle";
import { color1, color2, color4, color5 } from "../utils/Colors";
import Connexion from "../Screens/CompteScreens/Connexion";
import Inscription from "../Screens/CompteScreens/Inscription";
import Txt from "../components/Text/Txt";
export default function Compte({ navigation }) {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const logoSize = 24;

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={s.container}>
          <View style={s.header}>
            <ButtonComp
              disabled={isLoginPage}
              styl={
                isLoginPage
                  ? { zIndex: 10, borderRadius: 20, backgroundColor: color1 }
                  : { zIndex: -5, borderRadius: 20, backgroundColor: color2 }
              }
              onPress={() => setIsLoginPage(!isLoginPage)}
              textstyl={isLoginPage ? { color: color5 } : { color: color4 }}
            >
              Connexion
            </ButtonComp>
            <ButtonComp
              disabled={!isLoginPage}
              styl={
                isLoginPage
                  ? {
                      borderRadius: 20,
                      backgroundColor: color2,
                    }
                  : { borderRadius: 20, backgroundColor: color1 }
              }
              textstyl={isLoginPage ? { color: color4 } : { color: color5 }}
              onPress={() => setIsLoginPage(!isLoginPage)}
            >
              Inscription
            </ButtonComp>
          </View>
          {isLoginPage && <Connexion navigation={navigation} />}
          {!isLoginPage && <Inscription navigation={navigation} />}
          <Txt styles={{ fontSize: 24, alignSelf: "center" }}>OU</Txt>
          <View style={s.footer}>
            <ButtonComp
              styl={{ backgroundColor: "#4285F4" }}
              name="logo-google"
              size={logoSize}
              color={color5}
            >
              Connexion avec Google
            </ButtonComp>
            <ButtonComp
              styl={{ backgroundColor: "#3B5998" }}
              name="logo-facebook"
              size={logoSize}
              color={color5}
            >
              Connexion avec Facebook
            </ButtonComp>
            <ButtonComp
              styl={{ backgroundColor: color4 }}
              name="logo-apple"
              size={logoSize}
              color={color5}
            >
              Connexion avec Apple
            </ButtonComp>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
