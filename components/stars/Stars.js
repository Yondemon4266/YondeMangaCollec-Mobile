import StarRating from "react-native-star-rating";

import React from "react";
import { View } from "react-native";
import Txt from "../Text/Txt";
import { color1, color2, color3 } from "../../utils/Colors";
import { s } from "./StarsStyle";

export default function Stars({ data }) {
  return (
    <View>
      <View style={s.starsContainer}>
        <StarRating
          disabled={true}
          maxStars={5}
          rating={data.score ? data.score.toFixed(1) / 2 : 0}
          starSize={24}
          fullStarColor={color1}
          emptyStarColor={color3}
          containerStyle={s.starsC}
          starStyle={s.stars}
        />
        <Txt
          styles={{
            backgroundColor: color2,
            paddingHorizontal: 3,
            textAlign: "center",
          }}
        >
          {data.score ? data.score.toFixed(1) : 0}
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
    </View>
  );
}
