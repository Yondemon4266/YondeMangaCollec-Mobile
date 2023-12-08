import React from "react";
import { View } from "react-native";
import ButtonComp from "../Button/ButtonComp";
import { color1, color2, color4, color5 } from "../../utils/Colors";
import { s } from "./FiltreStyle";
export default function HeaderFiltre({
  isAnime,
  filterOptionOpen,
  ChangeFilterOptions,
}) {
  return (
    <View style={s.header}>
      {isAnime && (
        <ButtonComp
          disabled={filterOptionOpen.animeGenres}
          styl={
            filterOptionOpen.animeGenres
              ? { backgroundColor: color1 }
              : { backgroundColor: color2 }
          }
          textstyl={
            filterOptionOpen.animeGenres ? { color: color5 } : { color: color4 }
          }
          onPress={() => ChangeFilterOptions("animeGenres")}
        >
          Genres
        </ButtonComp>
      )}
      {!isAnime && (
        <ButtonComp
          disabled={filterOptionOpen.mangaGenres}
          styl={
            filterOptionOpen.mangaGenres
              ? { backgroundColor: color1 }
              : { backgroundColor: color2 }
          }
          textstyl={
            filterOptionOpen.mangaGenres ? { color: color5 } : { color: color4 }
          }
          onPress={() => ChangeFilterOptions("mangaGenres")}
        >
          Genres
        </ButtonComp>
      )}
      {isAnime && (
        <ButtonComp
          disabled={filterOptionOpen.studios}
          styl={
            filterOptionOpen.studios
              ? { backgroundColor: color1 }
              : { backgroundColor: color2 }
          }
          textstyl={
            filterOptionOpen.studios ? { color: color5 } : { color: color4 }
          }
          onPress={() => ChangeFilterOptions("studios")}
        >
          Studios
        </ButtonComp>
      )}
      {!isAnime && (
        <ButtonComp
          disabled={filterOptionOpen.magazines}
          styl={
            filterOptionOpen.magazines
              ? { backgroundColor: color1 }
              : { backgroundColor: color2 }
          }
          textstyl={
            filterOptionOpen.magazines ? { color: color5 } : { color: color4 }
          }
          onPress={() => ChangeFilterOptions("magazines")}
        >
          Magazines
        </ButtonComp>
      )}
    </View>
  );
}
