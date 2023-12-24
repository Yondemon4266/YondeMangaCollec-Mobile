import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { s } from "./UniversStyle";
import Txt from "../Text/Txt";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  authReducer,
  changeOptionsFinished,
  getUserData,
} from "../../Redux/UserSlice";
import { islands, villages } from "../../utils/UniverseUtils";
import { color3, color5, colorManga } from "../../utils/Colors";

export default function SelectVillageMarine({ navigation }) {
  const userId = useSelector((state) => state.User.userId);
  const userData = useSelector((state) => state.User.userData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  async function selectVillage(village) {
    const data = {};
    try {
      setLoading(true);
      if (userData.universe === "naruto") {
        data.village = village;
      } else {
        data.island = village;
      }
      const response = await axios({
        method: "patch",
        url: `https://server-yondemangacollec.onrender.com/api/user/selectvillageisland/${userId}`,
        data: data,
      });
      await dispatch(getUserData(userId));
    } catch (err) {
      console.log(err.response.data.message);
    } finally {
      setLoading(false);
      if (userData.universe === "onepiece") {
        navigation.navigate("SelectMarineOrPirate");
      } else if (userData.universe === "naruto") {
        dispatch(changeOptionsFinished(true));
        navigation.navigate("AccueilStack");
      }
    }
  }
  return (
    <View style={s.container}>
      <Txt
        styles={{
          fontFamily: "Literata-SemiBold",
          fontSize: 20,
        }}
      >
        {userData.universe === "naruto"
          ? "Choisissez votre village"
          : "Choisissez votre île"}
      </Txt>
      <ScrollView contentContainerStyle={s.scrollview}>
        {userData.universe === "naruto" &&
          villages.map((element, index) => (
            <TouchableOpacity
              onPress={() => selectVillage(element.village)}
              key={index}
              style={{ gap: 5 }}
            >
              <Image source={{ uri: element.img }} style={s.img} />
              <Txt styles={s.text}>{element.village}</Txt>
            </TouchableOpacity>
          ))}
        {userData.universe === "onepiece" &&
          islands.map((element, index) => (
            <TouchableOpacity
              onPress={() => selectVillage(element.island)}
              key={index}
              style={{ gap: 5 }}
            >
              <Image source={{ uri: element.img }} style={s.img} />
              <Txt styles={s.text}>{element.island}</Txt>
            </TouchableOpacity>
          ))}
      </ScrollView>
      {loading && (
        <>
          <ActivityIndicator size={"large"} />
          <Txt>Chargement...</Txt>
        </>
      )}
    </View>
  );
}
