import React from "react";
import { View } from "react-native";
import Tag from "../Tags/Tag";

export default function StudiosMagazinesOptions({
  isAnime,
  dataFiltres,
  AddOption,
  filterSearch,
}) {
  let categoryToDisplay;
  if (!filterSearch) {
    categoryToDisplay = isAnime ? dataFiltres.studios : dataFiltres.magazines;
  } else {
    categoryToDisplay = isAnime
      ? dataFiltres.studios.filter((studio) =>
          studio.titles[0].title
            .toLowerCase()
            .includes(filterSearch.toLowerCase())
        )
      : dataFiltres.magazines.filter((magazine) =>
          magazine.name.toLowerCase().includes(filterSearch.toLowerCase())
        );
  }

  return (
    <>
      {categoryToDisplay.map((categoryItem) => (
        <Tag
          key={categoryItem.mal_id}
          v={{ borderRadius: 5 }}
          onPress={() =>
            AddOption(
              categoryItem.mal_id,
              isAnime ? categoryItem.titles[0].title : categoryItem.name
            )
          }
        >
          {isAnime ? categoryItem.titles[0].title : categoryItem.name}
        </Tag>
      ))}
    </>
  );
}
