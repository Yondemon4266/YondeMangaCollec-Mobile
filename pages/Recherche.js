import React, { useEffect, useContext, useMemo } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "@rneui/themed";
import AnimeManga from "../components/CalendrierHeader.js/AnimeManga";
import { s } from "./RechercheStyle";
import { Filtre } from "../components/Filtre/Filtre";
import { searchbarStyle } from "../components/SearchBarStyle/SearchBarStyle";

import axios from "axios";
import Txt from "../components/Text/Txt";
import { SearchContext } from "../utils/SearchContext";
import CardList from "../components/CardList/CardList";

export default function Recherche({ navigation }) {
  const { state, dispatch } = useContext(SearchContext);
  const {
    isAnime,
    search,
    filterOptions,
    pageAnime,
    pageManga,
    isSearchSubmit,
    displayedData,
    loading,
  } = state;
  console.log("is ", isSearchSubmit);
  console.log("isopen ", filterOptions.isOpen);

  function UpdateSearch(search) {
    dispatch({ type: "SET_SEARCH", payload: search });
  }
  function ClearSearch() {
    dispatch({ type: "SET_SEARCH", payload: "" });
  }

  async function searchData() {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_IS_SEARCH_SUBMIT", payload: true });

    dispatch({
      type: "SET_FILTER_OPTIONS",
      payload: { ...filterOptions, isOpen: false },
    });

    const listGenresIds = isAnime
      ? filterOptions.animeGenres.map((genre) => genre.id)
      : filterOptions.mangaGenres.map((genre) => genre.id);

    const listStudiosMagazinesIds = isAnime
      ? filterOptions.studios.map((studio) => studio.id)
      : filterOptions.magazines.map((magazine) => magazine.id);

    const querySearch = search ? `q=${search}` : "";

    const apiUrl = isAnime
      ? `https://api.jikan.moe/v4/anime?sfw=true&genres=${
          listGenresIds.length > 0 ? listGenresIds : ""
        }&producers=${
          listStudiosMagazinesIds.length > 0 ? listStudiosMagazinesIds : ""
        }&page=${
          isAnime ? pageAnime : pageManga
        }&type=tv&movie&ova&ona&special&genres_exclude=12,9,49,15`
      : `https://api.jikan.moe/v4/manga?sfw=true&genres=${
          listGenresIds.length > 0 ? listGenresIds : ""
        }&magazines=${
          listStudiosMagazinesIds.length > 0 ? listStudiosMagazinesIds : ""
        }&page=${
          isAnime ? pageAnime : pageManga
        }&type=manga&novel&oneshot&manhwa&genres_exclude=12,9,49,15`;

    try {
      const response = await axios.get(
        apiUrl + (querySearch ? `&${querySearch}` : "")
      );
      dispatch({
        type: "SET_DISPLAYED_DATA",
        payload: {
          ...displayedData,
          [isAnime ? "animes" : "mangas"]: isSearchSubmit
            ? response.data.data
            : [
                ...displayedData[isAnime ? "animes" : "mangas"],
                ...response.data.data,
              ],
        },
      });
    } catch (error) {
      console.log("erreur API, trop d'appel surement", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
      dispatch({ type: "SET_IS_SEARCH_SUBMIT", payload: false });
    }
  }

  const SearchBarMemo = useMemo(
    () => (
      <SearchBar
        placeholder="Rechercher un élément..."
        containerStyle={searchbarStyle.searchbarfilters}
        inputContainerStyle={searchbarStyle.searchbarfiltersinput}
        inputStyle={searchbarStyle.searchbartext}
        leftIconContainerStyle={searchbarStyle.searchbaricon}
        lightTheme={true}
        onChangeText={UpdateSearch}
        value={search}
        onClear={ClearSearch}
        onSubmitEditing={() => {
          searchData();
        }}
      />
    ),
    [search, UpdateSearch, ClearSearch]
  );

  useEffect(() => {
    searchData();
  }, [pageAnime, pageManga, isAnime]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={s.container}>
        <View style={s.header}>
          {SearchBarMemo}
          <AnimeManga isAnime={isAnime} dispatch={dispatch} />
        </View>
        <Filtre
          isAnime={isAnime}
          filterOptions={filterOptions}
          dispatch={dispatch}
          searchData={searchData}
        />
        <View style={{ paddingVertical: 20, flex: 1 }}>
          {loading ? (
            <ActivityIndicator size={"large"} />
          ) : displayedData.animes.length === 0 &&
            displayedData.mangas.length === 0 ? (
            <Txt styles={{ textAlign: "center", lineHeight: 400 }}>
              Aucune oeuvre trouvé avec cette recherche.
            </Txt>
          ) : (
            <CardList
              isAnime={isAnime}
              dispatch={dispatch}
              pageAnime={pageAnime}
              pageManga={pageManga}
              displayedData={displayedData}
              loading={loading}
              navigation={navigation}
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
