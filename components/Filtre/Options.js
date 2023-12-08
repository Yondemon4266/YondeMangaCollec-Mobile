import React, { useMemo } from "react";
import { s } from "./FiltreStyle";
import { View, ScrollView } from "react-native";
import GenresOptions from "../FilterOptions/GenresOptions";
import StudiosMagazinesOptions from "../FilterOptions/StudiosMagazinesOptions";

export default function Options({
  isAnime,
  filterOptionOpen,
  dataFiltres,
  AddOption,
  filterSearch,
}) {
  return (
    <View style={s.optionscontainer}>
      <ScrollView contentContainerStyle={s.options} nestedScrollEnabled>
        {filterOptionOpen.animeGenres && isAnime && (
          <GenresOptions
            isAnime={isAnime}
            dataFiltres={dataFiltres}
            AddOption={AddOption}
            filterSearch={filterSearch}
          />
        )}
        {filterOptionOpen.mangaGenres && !isAnime && (
          <GenresOptions
            isAnime={isAnime}
            dataFiltres={dataFiltres}
            AddOption={AddOption}
            filterSearch={filterSearch}
          />
        )}
        {filterOptionOpen.studios && isAnime && (
          <StudiosMagazinesOptions
            isAnime={isAnime}
            dataFiltres={dataFiltres}
            AddOption={AddOption}
            filterSearch={filterSearch}
          />
        )}
        {filterOptionOpen.magazines && !isAnime && (
          <StudiosMagazinesOptions
            isAnime={isAnime}
            dataFiltres={dataFiltres}
            AddOption={AddOption}
            filterSearch={filterSearch}
          />
        )}
      </ScrollView>
    </View>
  );
}
