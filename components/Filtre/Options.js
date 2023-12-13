import React, { useEffect, useState } from "react";
import { s } from "./FiltreStyle";
import { View, FlatList } from "react-native";

import Tag from "../Tags/Tag";
import { DonneesFiltrees } from "../../utils/DonneesFiltres";
export default function Options({ isAnime, filterOptions, AddOption }) {
  const [selectedData, setSelectedData] = useState([]);

  const dataFiltres = DonneesFiltrees;

  useEffect(() => {
    let newData = [];

    if (isAnime) {
      if (filterOptions.studiosOpen) {
        newData = dataFiltres.studios;
      } else if (filterOptions.animeGenresOpen) {
        newData = dataFiltres.animeGenres;
      }
    } else {
      if (filterOptions.magazinesOpen) {
        newData = dataFiltres.magazines;
      } else if (filterOptions.mangaGenresOpen) {
        newData = dataFiltres.mangaGenres;
      }
    }
    newData = newData.filter((tag) =>
      filterOptions.studiosOpen && isAnime
        ? tag.titles[0].title
            .toLowerCase()
            .includes(filterOptions.search.toLowerCase())
        : tag.name.toLowerCase().includes(filterOptions.search.toLowerCase())
    );
    setSelectedData(newData);
  }, [filterOptions, isAnime]);

  return (
    <View style={s.optionscontainer}>
      <FlatList
        contentContainerStyle={s.options}
        data={selectedData}
        numColumns={3}
        initialNumToRender={10}
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
