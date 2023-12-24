import React from "react";
import { View } from "react-native";
import { s } from "./CalendrierHeaderStyle";
import { color1, color2, color4, color5 } from "../../utils/Colors";
import ButtonComp from "../Button/ButtonComp";
export default function AnimeManga({
  dispatch,
  isAnime,
  setIsAnime,
  isCalender,
}) {
  return (
    <View>
      <View style={s.animemanga}>
        <ButtonComp
          onPress={() => {
            if (isCalender) {
              setIsAnime(!isAnime);
            } else {
              dispatch({ type: "SET_IS_ANIME", payload: !isAnime });
            }
          }}
          styl={[
            s.button,
            isAnime ? { backgroundColor: color1 } : { backgroundColor: color2 },
          ]}
          disabled={isAnime}
          textstyl={isAnime ? { color: color5 } : { color: color4 }}
        >
          Animés
        </ButtonComp>
        <ButtonComp
          onPress={() => {
            if (isCalender) {
              setIsAnime(!isAnime);
            } else {
              dispatch({ type: "SET_IS_ANIME", payload: !isAnime });
            }
          }}
          styl={[
            s.button,
            !isAnime
              ? { backgroundColor: color1 }
              : { backgroundColor: color2 },
          ]}
          textstyl={!isAnime ? { color: color5 } : { color: color4 }}
          disabled={!isAnime}
        >
          Mangas
        </ButtonComp>
      </View>
    </View>
  );
}
