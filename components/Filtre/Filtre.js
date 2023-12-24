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


export const Filtre = ({
  isAnime,
  filterOptions,
  dispatch,
  setIsSearchSubmit,
}) => {
  const iconSize = 20;

  function ChangeFilterOptions(selectedOption) {
    if (isAnime) {
      dispatch({
        type: "SET_FILTER_OPTIONS",
        payload: {
          ...filterOptions,
          animeGenresOpen:
            selectedOption === "animeGenres"
              ? !filterOptions.animeGenresOpen
              : false,
          studiosOpen:
            selectedOption === "studios" ? !filterOptions.studiosOpen : false,
          loading: true,
        },
      });
    } else {
      dispatch({
        type: "SET_FILTER_OPTIONS",
        payload: {
          ...filterOptions,
          mangaGenresOpen:
            selectedOption === "mangaGenres"
              ? !filterOptions.mangaGenresOpen
              : false,
          magazinesOpen:
            selectedOption === "magazines"
              ? !filterOptions.magazinesOpen
              : false,
          loading: true,
        },
      });
    }
  }

  function AddOption(filterId, filterName) {
    const listKey = getListKey();
    const list = filterOptions[listKey];
    const isOptionInList = list.find((item) => item.name === filterName);
    if (!isOptionInList) {
      dispatch({
        type: "SET_FILTER_OPTIONS",
        payload: {
          ...filterOptions,
          [listKey]: [...list, { id: filterId, name: filterName }],
        },
      });
    }

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
    if (isAnime) {
      dispatch({
        type: "SET_FILTER_OPTIONS",
        payload: {
          ...filterOptions,
          animeGenres: filterOptions.animeGenres.filter(
            (genre) => genre.name !== filterName
          ),
          studios: filterOptions.studios.filter(
            (studio) => studio.name !== filterName
          ),
        },
      });
    } else if (!isAnime) {
      dispatch({
        type: "SET_FILTER_OPTIONS",
        payload: {
          ...filterOptions,
          mangaGenres: filterOptions.mangaGenres.filter(
            (genre) => genre.name !== filterName
          ),
          magazines: filterOptions.magazines.filter(
            (magazine) => magazine.name !== filterName
          ),
        },
      });
    }
  }

  function RemoveCategoryOptions() {
    if (isAnime) {
      dispatch({
        type: "SET_FILTER_OPTIONS",
        payload: {
          ...filterOptions,
          animeGenres: [],
          studios: [],
        },
      });
    } else if (!isAnime) {
      dispatch({
        type: "SET_FILTER_OPTIONS",
        payload: {
          ...filterOptions,
          mangaGenres: [],
          magazines: [],
        },
      });
    }
  }
  function UpdateFilterSearch(search) {
    dispatch({
      type: "SET_FILTER_OPTIONS",
      payload: {
        ...filterOptions,
        search: search,
      },
    });
  }
  function ClearFilterSearch() {
    dispatch({
      type: "SET_FILTER_OPTIONS",
      payload: {
        ...filterOptions,
        search: "",
      },
    });
  }
  return (
    <View style={s.container}>
      <ButtonComp
        name={filterOptions.isOpen ? "close" : "settings"}
        size={iconSize}
        color={color5}
        styl={s.filterbutton}
        onPress={() =>
          dispatch({
            type: "SET_FILTER_OPTIONS",
            payload: {
              ...filterOptions,
              isOpen: !filterOptions.isOpen,
            },
          })
        }
      >
        Filtrer
      </ButtonComp>

      {filterOptions.isOpen && (
        <>
          <HeaderFiltre
            ChangeFilterOptions={ChangeFilterOptions}
            filterOptions={filterOptions}
            isAnime={isAnime}
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
            dispatch={dispatch}
          />
          <ButtonComp
            onPress={() => {
              setIsSearchSubmit((prev) => {
                return !prev;
              });
            }}
          >
            Valider la recherche
          </ButtonComp>
        </>
      )}
    </View>
  );
}; 
