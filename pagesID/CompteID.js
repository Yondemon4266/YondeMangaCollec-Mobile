import {
  View,
  ImageBackground,
  Image,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authReducer } from "../Redux/UserSlice";
import bg from "../assets/onizukabg.jpg";
import img from "../assets/onizuka.jpg";
import { s } from "../components/CatalogueHeader/CatalogueHeaderStyle";
import Txt from "../components/Text/Txt";
import { color1, color2, color3, color5 } from "../utils/Colors";
import ButtonComp from "../components/Button/ButtonComp";
export default function CompteID() {
  const dispatch = useDispatch();
  const [ModalVisible, setModalVisible] = useState(false);
  const halfWidth = Dimensions.get("window").width / 1.3;
  async function logout() {
    try {
      const response = await axios({
        method: "get",
        url: "https://server-yondemangacollec.onrender.com/api/user/logout",
        withCredentials: true,
      });
      dispatch(authReducer(false));
      console.log("déconnecté !");
    } catch (err) {
      console.log("déconnecté avec erreur ?! ", err);
      dispatch(authReducer(false));
    }
  }
  return (
    <View style={{ flex: 1, gap: 15 }}>
      <ImageBackground source={bg} resizeMode="cover" style={s.bg}>
        <Image source={img} style={s.img} />
      </ImageBackground>
      <View style={s.infos}>
        <Txt styles={s.title}>Yondemon</Txt>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={s.lines}>
          <Txt>Gestion du compte</Txt>
          <View style={s.line}>
            <Txt styles={s.texttitle}>Email</Txt>
            <Txt styles={s.text2}>Modifier</Txt>
          </View>
          <View style={s.line}>
            <Txt styles={s.texttitle}>Nom d'utilisateur</Txt>
            <Txt>Modifier</Txt>
          </View>
          <View style={s.line}>
            <Txt styles={s.texttitle}>Mot de passe</Txt>
            <Txt>Modifier</Txt>
          </View>
          <View style={s.line}>
            <Txt>Compte créé le 12/01...</Txt>
          </View>
          <View style={s.line}>
            <Txt>J'aime l'App ♡</Txt>
            <Txt></Txt>
          </View>
        </View>

        <ButtonComp onPress={() => setModalVisible(!ModalVisible)}>
          Déconnexion
        </ButtonComp>
        <Modal
          visible={ModalVisible}
          animationType="fade"
          transparent
          onRequestClose={() => setModalVisible(!ModalVisible)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 22,
            }}
          >
            <View
              style={{
                backgroundColor: color5,
                padding: 20,
                width: halfWidth,
                height: 150,
                borderRadius: 8,
                gap: 25,
              }}
            >
              <Txt styles={{ textAlign: "center", fontSize: 16 }}>
                Êtes vous sûr de vouloir vous déconnecter?
              </Txt>
              <View
                style={{
                  flexDirection: "row",
                  gap: 30,
                  alignItems: "flex-end",
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                <TouchableOpacity
                  onPress={() => setModalVisible(!ModalVisible)}
                >
                  <Txt styles={{ fontSize: 16 }}>Fermer</Txt>
                </TouchableOpacity>
                <TouchableOpacity onPress={logout}>
                  <Txt styles={{ fontSize: 16 }}>Déconnexion</Txt>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
