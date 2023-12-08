import { ActivityIndicator, View } from "react-native";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { s } from "./FiltreStyle";
import ButtonComp from "../Button/ButtonComp";
import { color5 } from "../../utils/Colors";
import { SearchBar } from "@rneui/themed";
import { searchbarStyle } from "../SearchBarStyle/SearchBarStyle";

import HeaderFiltre from "./HeaderFiltre";
import OptionsSelected from "./OptionsSelected";
import Options from "./Options";

export default function Filtre(props) {
  const {
    isAnime,
    dataFiltres,
    filterOptions,
    setFilterOptions,
    searchMangaData,
    searchAnimeData,
  } = props;
  const [loading, setLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterOptionOpen, setFilterOptionOpen] = useState({
    animeGenres: true,
    mangaGenres: true,
    studios: false,
    magazines: false,
  });
  const [filterSearch, setFilterSearch] = useState("");
  const filterSearchRef = useRef();
  const iconSize = 20;

  function ChangeFilterOptions(selectedOption) {
    if (isAnime) {
      setFilterOptionOpen((prev) => ({
        ...prev,
        animeGenres:
          selectedOption === "animeGenres" ? !prev.animeGenres : false,
        studios: selectedOption === "studios" ? !prev.studios : false,
      }));
    } else {
      setFilterOptionOpen((prev) => ({
        ...prev,
        mangaGenres:
          selectedOption === "mangaGenres" ? !prev.mangaGenres : false,
        magazines: selectedOption === "magazines" ? !prev.magazines : false,
      }));
    }
  }

  function AddOption(filterId, filterName) {
    setFilterOptions((prev) => {
      if (filterOptionOpen.animeGenres && isAnime) {
        if (!prev.animeGenres.find((genre) => genre.id === filterId)) {
          return {
            ...prev,
            animeGenres: [
              ...prev.animeGenres,
              { id: filterId, name: filterName },
            ],
          };
        } else {
          return prev;
        }
      } else if (filterOptionOpen.mangaGenres && !isAnime) {
        if (!prev.mangaGenres.find((genre) => genre.id === filterId)) {
          return {
            ...prev,
            mangaGenres: [
              ...prev.mangaGenres,
              { id: filterId, name: filterName },
            ],
          };
        } else {
          return prev;
        }
      } else if (filterOptionOpen.studios && isAnime) {
        if (!prev.studios.find((studio) => studio.id === filterId)) {
          return {
            ...prev,
            studios: [...prev.studios, { id: filterId, name: filterName }],
          };
        } else {
          return prev;
        }
      } else if (filterOptionOpen.magazines && !isAnime) {
        if (!prev.magazines.find((magazine) => magazine.id === filterId)) {
          return {
            ...prev,
            magazines: [...prev.magazines, { id: filterId, name: filterName }],
          };
        }
      }
    });
  }

  function RemoveOption(filterName) {
    setFilterOptions((prev) => {
      if (isAnime) {
        return {
          ...prev,
          animeGenres: prev.animeGenres.filter(
            (genre) => genre.name !== filterName
          ),
          studios: prev.studios.filter((studio) => studio.name !== filterName),
        };
      } else if (!isAnime) {
        return {
          ...prev,
          mangaGenres: prev.mangaGenres.filter(
            (genre) => genre.name !== filterName
          ),
          magazines: prev.magazines.filter(
            (magazine) => magazine.name !== filterName
          ),
        };
      }
      return prev;
    });
  }

  function RemoveCategoryOptions() {
    if (isAnime) {
      setFilterOptions((prev) => ({
        ...prev,
        animeGenres: [],
        studios: [],
      }));
    } else if (!isAnime) {
      setFilterOptions((prev) => ({
        ...prev,
        mangaGenres: [],
        magazines: [],
      }));
    }
  }
  function UpdateFilterSearch(search) {
    setFilterSearch(search);
  }

  function ClearFilterSearch() {
    setFilterSearch("");
  }

  return (
    <View style={s.container}>
      <ButtonComp
        name={isFilterOpen ? "close" : "settings"}
        size={iconSize}
        color={color5}
        styl={s.filterbutton}
        onPress={() => setIsFilterOpen(!isFilterOpen)}
      >
        Filtrer
      </ButtonComp>

      {isFilterOpen && (
        <>
          <HeaderFiltre
            isAnime={isAnime}
            ChangeFilterOptions={ChangeFilterOptions}
            filterOptionOpen={filterOptionOpen}
          />
          <SearchBar
            placeholder="Rechercher un tag"
            containerStyle={[searchbarStyle.searchbarfilters]}
            inputContainerStyle={searchbarStyle.searchbarfiltersinput}
            inputStyle={searchbarStyle.searchbartext}
            lightTheme={true}
            onChangeText={UpdateFilterSearch}
            value={filterSearch}
            ref={filterSearchRef}
            onClear={ClearFilterSearch}
          />
          <OptionsSelected
            isAnime={isAnime}
            filterOptions={filterOptions}
            RemoveCategoryOptions={RemoveCategoryOptions}
            RemoveOption={RemoveOption}
          />

          <Options
            isAnime={isAnime}
            filterOptionOpen={filterOptionOpen}
            dataFiltres={dataFiltres}
            AddOption={AddOption}
            filterSearch={filterSearch}
          />
          <ButtonComp
            onPress={() => (isAnime ? searchAnimeData() : searchMangaData())}
          >
            Valider la recherche
          </ButtonComp>
        </>
      )}
    </View>
  );
}
