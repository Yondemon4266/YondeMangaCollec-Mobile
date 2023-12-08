import React, { useEffect, useState, useRef, useMemo } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "@rneui/themed";
import AnimeManga from "../components/CalendrierHeader.js/AnimeManga";
import { s } from "./RechercheStyle";
import Filtre from "../components/Filtre/Filtre";
import { searchbarStyle } from "../components/SearchBarStyle/SearchBarStyle";
import { DonneesFiltrees } from "../utils/DonneesFiltres";
import Card from "../components/Card/Card";
import { ScrollView } from "react-native";

import axios from "axios";
export default function Recherche({ navigation }) {
  const [isAnime, setIsAnime] = useState(true);
  const searchRef = useRef();
  const [search, setSearch] = useState("");
  const dataFiltres = DonneesFiltrees;
  const [displayedData, setDisplayedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    mangaGenres: [],
    animeGenres: [],
    studios: [],
    magazines: [],
  });

  function UpdateSearch(search) {
    setSearch(search);
  }
  function ClearSearch() {
    setSearch("");
  }

  async function searchMangaData() {
    setLoading(true);
    const listMangaGenresIds = filterOptions.mangaGenres.map(
      (genre) => genre.id
    );
    const listMagazinesIds = filterOptions.magazines.map(
      (magazine) => magazine.id
    );
    const querySearch = search ? `q=${search}` : "";

    axios
      .get(
        `https://api.jikan.moe/v4/manga?${querySearch}?sfw&genres=${
          listMangaGenresIds.length > 0 ? listMangaGenresIds : ""
        }&magazines=${listMagazinesIds.length > 0 ? listMagazinesIds : ""}`
      )
      .then((response) => setDisplayedData(response.data.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }
  async function searchAnimeData() {
    setLoading(true);
    const listAnimeGenresIds = filterOptions.animeGenres.map(
      (genre) => genre.id
    );
    const listStudiosIds = filterOptions.studios.map((studio) => studio.id);
    const querySearch = search ? `q=${search}` : "";

    axios
      .get(
        `https://api.jikan.moe/v4/anime?${querySearch}?sfw&genres=${
          listAnimeGenresIds.length > 0 ? listAnimeGenresIds : ""
        }&producers=${listStudiosIds.length > 0 ? listStudiosIds : ""}`
      )
      .then((response) => setDisplayedData(response.data.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  async function getAnimeData() {
    axios
      .get(
        "https://api.jikan.moe/v4/top/anime?q=&sfw&filter=bypopularity&filter=airing&type=tv&movie&rating=pg13&r&r17"
      )
      .then((response) => setDisplayedData(response.data.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }
  async function getMangaData() {
    axios
      .get(
        "https://api.jikan.moe/v4/top/manga?q=&sfw&filter=bypopularity&filter=publishing"
      )
      .then((response) => setDisplayedData(response.data.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    const isFilterOptionsEmpty = Object.values(filterOptions).every(
      (option) => option.length === 0
    );
    setLoading(true);

    if (isAnime && isFilterOptionsEmpty && !search) {
      getAnimeData();
    } else if (!isAnime && isFilterOptionsEmpty && !search) {
      getMangaData();
    } else if (isAnime && (!isFilterOptionsEmpty || search)) {
      searchAnimeData();
    } else if (!isAnime && (!isFilterOptionsEmpty || search)) {
      searchMangaData();
    }
  }, [isAnime]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={s.container}>
        <View style={s.header}>
          <SearchBar
            placeholder="Rechercher un élément..."
            containerStyle={searchbarStyle.searchbarfilters}
            inputContainerStyle={searchbarStyle.searchbarfiltersinput}
            inputStyle={searchbarStyle.searchbartext}
            leftIconContainerStyle={searchbarStyle.searchbaricon}
            lightTheme={true}
            onChangeText={UpdateSearch}
            value={search}
            ref={searchRef}
            onClear={ClearSearch}
            onSubmitEditing={() =>
              isAnime ? searchAnimeData() : searchMangaData()
            }
          />
          <AnimeManga
            isAnime={isAnime}
            setIsAnime={setIsAnime}
            styl={s.animemanga}
          />
        </View>
        <Filtre
          isAnime={isAnime}
          dataFiltres={dataFiltres}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          searchAnimeData={searchAnimeData}
          searchMangaData={searchMangaData}
        />
        {loading && <ActivityIndicator size="large" />}
        <View style={{ paddingVertical: 20, flex: 1 }}>
          {!loading && (
            <ScrollView
              contentContainerStyle={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                paddingHorizontal: 5,
                gap: 5,
              }}
            >
              {displayedData.map((card, index) => (
                <Card
                  key={index}
                  data={card}
                  navigation={navigation}
                  imgstyl={{ flex: 1 }}
                  textstyl={{ fontSize: 12 }}
                />
              ))}
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
