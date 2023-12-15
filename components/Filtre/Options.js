import React, { useEffect, useState } from "react";
import { s } from "./FiltreStyle";
import { View, FlatList } from "react-native";

import Tag from "../Tags/Tag";
import { DonneesFiltrees } from "../../utils/DonneesFiltres";
export default function Options({ isAnime, filterOptions, AddOption }) {
  const [itemsToShow, setItemsToShow] = useState(10);
  const [listData, setListData] = useState({ ...DonneesFiltrees });

  function categoryToShow() {
    if (filterOptions.mangaGenresOpen && !isAnime) {
      return "mangaGenres";
    } else if (filterOptions.magazinesOpen && !isAnime) {
      return "magazines";
    } else if (filterOptions.studiosOpen && isAnime) {
      return "studios";
    } else {
      return "animeGenres";
    }
  }

  function getData() {
    setListData((prev) => {
      let originalData = DonneesFiltrees[categoryToShow()]; // Sauvegarder les données d'origine

      // Filtrer les données si nécessaire
      let newData;
      if (filterOptions.search) {
        newData = originalData.filter((tag) =>
          filterOptions.studiosOpen && isAnime
            ? tag.titles[0].title
                .toLowerCase()
                .includes(filterOptions.search.toLowerCase())
            : tag.name
                .toLowerCase()
                .includes(filterOptions.search.toLowerCase())
        );
      } else {
        newData = originalData; // Réinitialiser avec les données d'origine
      }

      return {
        ...prev,
        [categoryToShow()]: newData,
      };
    });
  }

  useEffect(() => {
    getData();
  }, [filterOptions.search]);
  useEffect(() => {
    setItemsToShow(10);
  }, [
    filterOptions.mangaGenresOpen,
    filterOptions.animesGenreOpen,
    filterOptions.magazinesOpen,
    filterOptions.studiosOpen,
    isAnime,
  ]);

  return (
    <View style={s.optionscontainer}>
      <FlatList
        contentContainerStyle={s.options}
        data={listData[categoryToShow()].slice(0, itemsToShow)}
        extraData={listData}
        numColumns={3}
        onEndReached={() => setItemsToShow((prev) => prev + 10)}
        renderItem={({ item }) => (
          <Tag
            onPress={() =>
              AddOption(
                item.mal_id,
                filterOptions.studiosOpen && isAnime
                  ? item.titles[0].title
                  : item.name || ""
              )
            }
            key={(item, index) => index}
            v={{ borderRadius: 5 }}
          >
            {item.name || item.titles[0].title}
          </Tag>
        )}
      />
    </View>
  );
}
