import { ActivityIndicator, View } from "react-native";
import React from "react";
import { s } from "./FiltreStyle";
import ButtonComp from "../Button/ButtonComp";
import { color5 } from "../../utils/Colors";
import { SearchBar } from "@rneui/themed";
import { searchbarStyle } from "../SearchBarStyle/SearchBarStyle";
import HeaderFiltre from "./HeaderFiltre";
import OptionsSelected from "./OptionsSelected";
import Options from "./Options";

export const Filtre = (props) => {
  const { isAnime, filterOptions, setFilterOptions, setIsSearchSubmit } = props;

  const iconSize = 20;

  function ChangeFilterOptions(selectedOption) {
    if (isAnime) {
      setFilterOptions((prev) => ({
        ...prev,
        animeGenresOpen:
          selectedOption === "animeGenres" ? !prev.animeGenresOpen : false,
        studiosOpen: selectedOption === "studios" ? !prev.studiosOpen : false,
      }));
    } else {
      setFilterOptions((prev) => ({
        ...prev,
        mangaGenresOpen:
          selectedOption === "mangaGenres" ? !prev.mangaGenresOpen : false,
        magazinesOpen:
          selectedOption === "magazines" ? !prev.magazinesOpen : false,
      }));
    }
  }

  function AddOption(filterId, filterName) {
    setFilterOptions((prev) => {
      const listKey = getListKey();

      if (listKey && prev[listKey]) {
        const list = prev[listKey];
        const isOptionInList = list.find((item) => item.name === filterName);

        if (!isOptionInList) {
          return {
            ...prev,
            [listKey]: [...list, { id: filterId, name: filterName }],
          };
        }
      }

      return prev;
    });

    function getListKey() {
      if (filterOptions.animeGenresOpen && isAnime) {
        return "animeGenres";
      } else if (filterOptions.mangaGenresOpen && !isAnime) {
        return "mangaGenres";
      } else if (filterOptions.studiosOpen && isAnime) {
        return "studios";
      } else if (filterOptions.magazinesOpen && !isAnime) {
        return "magazines";
      }

      return null;
    }
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
    setFilterOptions((prev) => ({
      ...prev,
      search: search,
    }));
  }

  function ClearFilterSearch() {
    setFilterOptions((prev) => ({
      ...prev,
      search: "",
    }));
  }

  return (
    <View style={s.container}>
      <ButtonComp
        name={filterOptions.isOpen ? "close" : "settings"}
        size={iconSize}
        color={color5}
        styl={s.filterbutton}
        onPress={() =>
          setFilterOptions((prev) => ({
            ...prev,
            isOpen: !prev.isOpen,
          }))
        }
      >
        Filtrer
      </ButtonComp>

      {filterOptions.isOpen && (
        <>
          <HeaderFiltre
            isAnime={isAnime}
            ChangeFilterOptions={ChangeFilterOptions}
            filterOptions={filterOptions}
          />
          <SearchBar
            placeholder="Rechercher un tag"
            containerStyle={[searchbarStyle.searchbarfilters]}
            inputContainerStyle={searchbarStyle.searchbarfiltersinput}
            inputStyle={searchbarStyle.searchbartext}
            lightTheme={true}
            onChangeText={UpdateFilterSearch}
            value={filterOptions.search}
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
            filterOptions={filterOptions}
            AddOption={AddOption}
          />
          <ButtonComp onPress={() => setIsSearchSubmit(true)}>
            Valider la recherche
          </ButtonComp>
        </>
      )}
    </View>
  );
}; 
