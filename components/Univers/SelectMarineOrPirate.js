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
import {
  authReducer,
  changeOptionsFinished,
  getUserData,
} from "../../Redux/UserSlice";

export default function SelectMarineOrPirate({ navigation }) {
  const userId = useSelector((state) => state.User.userId);
  const userData = useSelector((state) => state.User.userData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  async function selectCamp(camp) {
    try {
      setLoading(true);
      const response = await axios({
        method: "patch",
        url: `https://server-yondemangacollec.onrender.com/api/user/selectmarineorpirate/${userId}`,
        data: {
          marineorpirate: camp,
        },
      });
      await dispatch(getUserData(userId));
      console.log(response.data.message);
    } catch (err) {
      console.log(err.response.data.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
        dispatch(changeOptionsFinished(true));
        navigation.navigate("AccueilStack");
      }, 1000);
    }
  }
  return (
    <View style={s.container}>
      <Txt styles={{ fontFamily: "Literata-SemiBold", fontSize: 20 }}>
        Choisissez votre camp
      </Txt>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <TouchableOpacity onPress={() => selectCamp("marine")}>
          <Image
            source={{
              uri: "https://www.mangamag.fr/wp-content/uploads/2023/04/akainu-one-piece-amiral-1024x576.png",
            }}
            style={s.img}
          />
          <Txt>Marine</Txt>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selectCamp("pirate")}>
          <Image
            source={{
              uri: "https://www.japanfm.fr/wp-content/uploads/2022/12/Barbe-Noire-1-scaled.jpg",
            }}
            style={s.img}
          />
          <Txt>Pirate</Txt>
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
