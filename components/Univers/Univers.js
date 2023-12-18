import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { s } from "./UniversStyle";
import naruto from "../../assets/images/univers/naruto.png";
import onepiece from "../../assets/images/univers/onepiece.png";
import Txt from "../Text/Txt";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../Redux/UserSlice";

export default function Univers({ navigation }) {
  const userId = useSelector((state) => state.User.userId);
  const userData = useSelector((state) => state.User.userData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  async function selectUniverse(universe) {
    try {
      const response = await axios({
        method: "patch",
        url: `https://server-yondemangacollec.onrender.com/api/user/selectuniverse/${userId}`,
        data: {
          universe: universe,
        },
      });
      dispatch(getUserData(userId));
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate("SelectVillageMarine");
      }, 1000);
    } catch (err) {
      console.log(err.response.data.message);
    }
  }
  return (
    <View style={s.container}>
      <Txt styles={{ fontFamily: "Literata-SemiBold", fontSize: 20 }}>
        Choisissez votre univers
      </Txt>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <TouchableOpacity onPress={() => selectUniverse("naruto")}>
          <Image source={naruto} style={s.img} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selectUniverse("onepiece")}>
          <Image source={onepiece} style={s.img} />
        </TouchableOpacity>
      </View>
      {loading && (
        <>
          <ActivityIndicator size={"large"} />
          <Txt>Chargement...</Txt>
        </>
      )}
    </View>
  );
}
