import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "@rneui/themed";
import AnimeManga from "../components/CalendrierHeader.js/AnimeManga";
import { s } from "./RechercheStyle";
import { Filtre } from "../components/Filtre/Filtre";
import { searchbarStyle } from "../components/SearchBarStyle/SearchBarStyle";
import Card from "../components/Card/Card";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";
import Txt from "../components/Text/Txt";
export default function Recherche({ navigation }) {
  const [isAnime, setIsAnime] = useState(true);
  const [search, setSearch] = useState("");
  const [displayedData, setDisplayedData] = useState({
    animes: [],
    mangas: [],
  });
  const [loading, setLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    isOpen: false,
    mangaGenres: [],
    animeGenres: [],
    studios: [],
    magazines: [],
    animeGenresOpen: true,
    mangaGenresOpen: true,
    studiosOpen: false,
    magazinesOpen: false,
    search: "",
    loading: false,
  });
  const [pageAnime, setPageAnime] = useState(1);
  const [pageManga, setPageManga] = useState(1);
  const [isSearchSubmit, setIsSearchSubmit] = useState(false);
  const [searchCache, setSearchCache] = useState({
    queryAnime: [],
    queryManga: [],
  });

  function UpdateSearch(search) {
    setSearch(search);
  }
  function ClearSearch() {
    setSearch("");
  }

  async function searchData() {
    setFilterOptions((prev) => ({
      ...prev,
      isOpen: false,
    }));
    const listMangaGenresIds = filterOptions.mangaGenres.map(
      (genre) => genre.id
    );
    const listMagazinesIds = filterOptions.magazines.map(
      (magazine) => magazine.id
    );
    const listAnimeGenresIds = filterOptions.animeGenres.map(
      (genre) => genre.id
    );
    const listStudiosIds = filterOptions.studios.map((studio) => studio.id);
    const querySearch = search ? `q=${search}` : "";
    const queryManga =
      listMangaGenresIds + listMagazinesIds + querySearch + pageManga;
    const queryAnime =
      listAnimeGenresIds + listStudiosIds + querySearch + pageAnime;

    if (isAnime) {
      setLoading(true);
      if (searchCache.queryAnime[queryAnime]) {
        setDisplayedData((prev) => ({
          ...prev,
          animes: searchCache.queryAnime[queryAnime],
        }));
        setLoading(false);
      } else {
        axios
          .get(
            `https://api.jikan.moe/v4/anime?${querySearch}?sfw&genres=${
              listAnimeGenresIds.length > 0 ? listAnimeGenresIds : ""
            }&producers=${
              listStudiosIds.length > 0 ? listStudiosIds : ""
            }&page=${pageAnime}&type=tv&movie&ova&ona&special&genres_exclude=12,9,49,15`
          )
          .then((response) => {
            setDisplayedData((prev) => {
              if (isSearchSubmit) {
                setIsSearchSubmit(false);
                setSearchCache((prevCache) => ({
                  ...prevCache,
                  queryAnime: {
                    ...prevCache.queryAnime,
                    [queryAnime]: response.data.data,
                  },
                }));
                return {
                  ...prev,
                  animes: response.data.data,
                };
              }
              return {
                ...prev,
                animes: [...prev.animes, ...response.data.data],
              };
            });
          })
          .catch((error) => console.log(error))
          .finally(() => setLoading(false));
      }
    } else {
      setLoading(true);
      if (searchCache.queryManga[queryManga]) {
        setDisplayedData((prev) => ({
          ...prev,
          mangas: searchCache.queryManga[queryManga],
        }));
        setLoading(false);
        console.log("cache");
      } else {
        axios
          .get(
            `https://api.jikan.moe/v4/manga?${querySearch}?sfw&genres=${
              listMangaGenresIds.length > 0 ? listMangaGenresIds : ""
            }&magazines=${
              listMagazinesIds.length > 0 ? listMagazinesIds : ""
            }&page=${pageManga}&type=manga&novel&oneshot&manhwa&genres_exclude=12,9,49,15`
          )
          .then((response) => {
            setDisplayedData((prev) => {
              if (isSearchSubmit) {
                setIsSearchSubmit(false);
                setSearchCache((prevCache) => ({
                  ...prevCache,
                  queryManga: {
                    ...prevCache.queryManga,
                    [queryManga]: response.data.data,
                  },
                }));
                return {
                  ...prev,
                  mangas: response.data.data,
                };
              }
              return {
                ...prev,
                mangas: [...prev.mangas, ...response.data.data],
              };
            });
          })
          .catch((error) => console.log(error))
          .finally(() => setLoading(false));
      }
    }
  }

  useEffect(() => {
    searchData();
  }, [isAnime, pageManga, pageAnime, isSearchSubmit]);

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
            onClear={ClearSearch}
            onSubmitEditing={() => setIsSearchSubmit(true)}
          />
          <AnimeManga
            isAnime={isAnime}
            setIsAnime={setIsAnime}
            styl={s.animemanga}
          />
        </View>
        <Filtre
          isAnime={isAnime}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          setIsSearchSubmit={setIsSearchSubmit}
          searchData={searchData}
        />
        <View style={{ paddingVertical: 20, flex: 1 }}>
          {!loading &&
          displayedData.animes.length === 0 &&
          displayedData.mangas.length === 0 ? (
            <Txt styles={{ textAlign: "center", lineHeight: 400 }}>
              Aucune oeuvre trouvé avec cette recherche.
            </Txt>
          ) : (
            <FlatList
              data={isAnime ? displayedData.animes : displayedData.mangas}
              renderItem={({ item }) => (
                <Card
                  data={item}
                  navigation={navigation}
                  imgstyl={{ flex: 1 }}
                  textstyl={{ fontSize: 12 }}
                  key={() => uuidv4(v4options)}
                  anime={isAnime ? true : false}
                />
              )}
              contentContainerStyle={{
                paddingHorizontal: 5,
                alignItems: "center",
                gap: 5,
              }}
              numColumns={2}
              horizontal={false}
              refreshing={loading}
              onRefresh={() => {}}
              onEndReached={() =>
                isAnime
                  ? setPageAnime((prev) => prev + 1)
                  : setPageManga((prev) => prev + 1)
              }
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
