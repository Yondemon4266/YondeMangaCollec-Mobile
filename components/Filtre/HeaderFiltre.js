import React from "react";
import { View } from "react-native";
import ButtonComp from "../Button/ButtonComp";
import { color1, color2, color4, color5 } from "../../utils/Colors";
import { s } from "./FiltreStyle";
export default function HeaderFiltre({
  isAnime,
  filterOptions,
  ChangeFilterOptions,
}) {
  return (
    <View style={s.header}>
      {isAnime && (
        <ButtonComp
          disabled={filterOptions.animeGenresOpen}
          styl={
            filterOptions.animeGenresOpen
              ? { backgroundColor: color1 }
              : { backgroundColor: color2 }
          }
          textstyl={
            filterOptions.animeGenresOpen
              ? { color: color5 }
              : { color: color4 }
          }
          onPress={() => ChangeFilterOptions("animeGenres")}
        >
          Genres
        </ButtonComp>
      )}
      {!isAnime && (
        <ButtonComp
          disabled={filterOptions.mangaGenresOpen}
          styl={
            filterOptions.mangaGenresOpen
              ? { backgroundColor: color1 }
              : { backgroundColor: color2 }
          }
          textstyl={
            filterOptions.mangaGenresOpen
              ? { color: color5 }
              : { color: color4 }
          }
          onPress={() => ChangeFilterOptions("mangaGenres")}
        >
          Genres
        </ButtonComp>
      )}
      {isAnime && (
        <ButtonComp
          disabled={filterOptions.studiosOpen}
          styl={
            filterOptions.studiosOpen
              ? { backgroundColor: color1 }
              : { backgroundColor: color2 }
          }
          textstyl={
            filterOptions.studiosOpen ? { color: color5 } : { color: color4 }
          }
          onPress={() => ChangeFilterOptions("studios")}
        >
          Studios
        </ButtonComp>
      )}
      {!isAnime && (
        <ButtonComp
          disabled={filterOptions.magazinesOpen}
          styl={
            filterOptions.magazinesOpen
              ? { backgroundColor: color1 }
              : { backgroundColor: color2 }
          }
          textstyl={
            filterOptions.magazinesOpen ? { color: color5 } : { color: color4 }
          }
          onPress={() => ChangeFilterOptions("magazines")}
        >
          Magazines
        </ButtonComp>
      )}
    </View>
  );
}
