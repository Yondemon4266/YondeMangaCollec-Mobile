import React from "react";

import Tag from "../Tags/Tag";
export default function GenresOptions({
  isAnime,
  dataFiltres,
  AddOption,
  filterSearch,
}) {
  let genresToDisplay;
  if (!filterSearch) {
    genresToDisplay = isAnime
      ? dataFiltres.animeGenres
      : dataFiltres.mangaGenres;
  } else {
    genresToDisplay = isAnime
      ? dataFiltres.animeGenres.filter((genre) =>
          genre.name.toLowerCase().includes(filterSearch.toLowerCase())
        )
      : dataFiltres.mangaGenres.filter((genre) =>
          genre.name.toLowerCase().includes(filterSearch.toLowerCase())
        );
  }
  return (
    <>
      {genresToDisplay.map((genre) => (
        <Tag
          key={genre.mal_id}
          v={{ borderRadius: 5 }}
          onPress={() => AddOption(genre.mal_id, genre.name)}
        >
          {genre.name}
        </Tag>
      ))}
    </>
  );
}
