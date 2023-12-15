import { View, Image, Dimensions, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { color1 } from "../../utils/Colors";
import img from "../../assets/logoapp.png";
import { useDispatch } from "react-redux";
import { authReducer } from "../../Redux/UserSlice";
import Txt from "../../components/Text/Txt";
export default function ConnexionReussi({ navigation }) {
  const widthIcon = Dimensions.get("window").width / 1.2;
  const heightIcon = 300;
  const dispatch = useDispatch();
  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(authReducer(true));
      navigation.navigate("AccueilStack");
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [navigation]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
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
