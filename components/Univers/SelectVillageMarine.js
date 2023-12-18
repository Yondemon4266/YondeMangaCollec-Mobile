import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { s } from "./UniversStyle";
import Txt from "../Text/Txt";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../Redux/UserSlice";
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
      dispatch(getUserData(userId));
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate("AccueilStack");
      }, 1000);
    } catch (err) {
      console.log(err.response.data.message);
    }
  }
  return (
    <View style={s.container}>
      <Txt
        styles={{
          fontFamily: "Literata-SemiBold",
          fontSize: 20,
          marginBottom: 40,
        }}
      >
        {userData.universe === "naruto"
          ? "Choisissez votre village"
          : "Choisissez votre île"}
      </Txt>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        {userData.universe === "naruto" &&
          villages.map((element) => (
            <TouchableOpacity
              onPress={() => selectVillage(element)}
              style={[s.button, { backgroundColor: color3 }]}
            >
              <Txt styles={{ fontSize: 16, color: color5 }}>{element}</Txt>
            </TouchableOpacity>
          ))}
        {userData.universe === "onepiece" &&
          islands.map((element) => (
            <TouchableOpacity
              onPress={() => selectVillage(element)}
              style={[s.button, { backgroundColor: colorManga }]}
            >
              <Txt styles={{ fontSize: 16, color: color5 }}>{element}</Txt>
            </TouchableOpacity>
          ))}
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
