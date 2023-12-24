import { View, Image, Dimensions, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { color1 } from "../../utils/Colors";
import img from "../../assets/logoapp.png";
import Txt from "../../components/Text/Txt";
import { s } from "../../components/Univers/UniversStyle";
import { useDispatch } from "react-redux";
import { authReducer, changeOptionsFinished } from "../../Redux/UserSlice";
export default function ConnexionReussi({ navigation, route }) {
  const { connexion } = route.params;
  const widthIcon = Dimensions.get("window").width / 1.2;
  const heightIcon = 300;
  const dispatch = useDispatch();
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (connexion) {
        dispatch(changeOptionsFinished(true));
        navigation.navigate("AccueilStack");
      } else {
        navigation.navigate("Univers");
      }
    }, 2000);
    return () => clearTimeout(timeOut);
  }, [navigation]);
  return (
    <View style={s.container}>
      <Image
        source={img}
        style={{ width: widthIcon, height: heightIcon, resizeMode: "cover" }}
      />
      <ActivityIndicator size={"large"} style={{ color: color1 }} />
      <Txt styles={{ fontFamily: "Literata-SemiBold", fontSize: 18 }}>
        Connexion
      </Txt>
    </View>
  );
}
