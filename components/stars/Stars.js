import StarRating from "react-native-star-rating";

import React, { useState } from "react";
import { View } from "react-native";
import Txt from "../Text/Txt";
import { color1, color2, color3 } from "../../utils/Colors";
import { s } from "./StarsStyle";
import { useDispatch } from "react-redux";
import { getUserData } from "../../Redux/UserSlice";
import axios from "axios";

export default function Stars({ data, isLogged, userId, userData, itemIndex }) {
  const [userScore, setUserScore] = useState(0);
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  const RatingFunction = () => {
    if (isLogged) {
      return userData && userData.colleclist[itemIndex]?.popularityValue
        ? userData.colleclist[itemIndex]?.popularityValue
        : userScore;
    } else {
      return data.score ? data.score.toFixed(1) / 2 : 0;
    }
  };
  const RatingConst = RatingFunction();

  async function sendScore(rate) {
    setUserScore(rate);
    if (isLogged)
      try {
        const response = await axios({
          method: "patch",
          url: `https://server-yondemangacollec.onrender.com/api/user/colleclistpopularitypatch/${userId}/${data.mal_id}`,
          data: { popularityValue: rate },
        });
        await dispatch(getUserData(userId));
        setMsg(response.data.message);
        setTimeout(() => {
          setMsg("");
        }, 2000);
      } catch (err) {
        console.log(err);
        setMsg("Pas pu trouver l'élément...");
        setTimeout(() => {
          setMsg("");
        }, 2000);
      }
  }

  return (
    <View>
      <View style={s.starsContainer}>
        <StarRating
          disabled={!isLogged}
          maxStars={5}
          rating={RatingConst}
          starSize={24}
          fullStarColor={color1}
          emptyStarColor={color3}
          containerStyle={s.starsC}
          starStyle={s.stars}
          halfStarEnabled={true}
          selectedStar={(rate) => sendScore(rate)}
        />
        <Txt
          styles={{
            backgroundColor: color2,
            paddingHorizontal: 3,
            textAlign: "center",
          }}
        >
          {RatingConst}
        </Txt>
      </View>
      <Txt
        styles={{
          textAlign: "center",
          fontSize: 12,
          fontFamily: "Literata-Regular",
        }}
      >
        MyAnimeList score
      </Txt>
      <Txt styles={{ textAlign: "center", color: "green" }}>{msg}</Txt>
    </View>
  );
}
