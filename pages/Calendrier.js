import React, { useEffect, useState } from "react";
import {} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./CalendrierStyle";
import ListCalender from "../components/ListCalender/ListCalender";
import CalendrierHeader from "../components/CalendrierHeader.js/CalendrierHeader";
import GetSeasonNow from "../utils/GetSeasonNow";
import FetchHooks from "../Hooks/FetchHooks";

export default function Calendrier({ navigation }) {
  const date = new Date().toLocaleDateString("fr", {
    year: "numeric",
    month: "numeric",
  });
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { get } = FetchHooks();
  const [year, setYear] = useState(Number(date.split("/")[1]));
  const month = date.split("/")[0];
  const [isAnime, setIsAnime] = useState(true);
  const [season, setSeason] = useState(GetSeasonNow(month));
  const [pageAnime, setPageAnime] = useState(1);
  const [pageManga, setPageManga] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loadingScroll, setLoadingScroll] = useState(false);

  useEffect(() => {
    if (isAnime) {
      if (isScrolled) {
        setLoadingScroll(true);
      } else {
        setLoading(true);
      }
      get(
        `https://api.jikan.moe/v4/seasons/${year}/${season}?sfw&filter=tv&movie&page=${pageAnime}`
      )
        .then((response) => {
          if (isScrolled) {
            setDataList((prev) => [...prev, ...response.data.data]);
          } else {
            setDataList(response.data.data);
          }
        })
        .catch((error) => console.log("ListCalender", error))
        .finally(() => {
          setLoading(false);
          setIsScrolled(false);
          setLoadingScroll(false);
        });
    } else if (!isAnime) {
      if (isScrolled) {
        setLoadingScroll(true);
      } else {
        setLoading(true);
      }
      get(
        `https://api.jikan.moe/v4/manga?q=&sfw&status=publishing&order_by=popularity&page=${pageManga}&genres_exclude=12,9,49,15`
      )
        .then((response) => {
          if (isScrolled) {
            setDataList((prev) => [...prev, ...response.data.data]);
          } else {
            setDataList(response.data.data);
          }
        })
        .catch((error) => console.log("ListCalender", error))
        .finally(() => {
          setLoading(false);
          setIsScrolled(false);
          setLoadingScroll(false);
        });
    }
  }, [year, season, isAnime, pageAnime, pageManga]);

  function pageAnimeInc() {
    setPageAnime((prev) => prev + 1);
  }
  function pageMangaInc() {
    setPageManga((prev) => prev + 1);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={s.container}>
        <CalendrierHeader isAnime={isAnime} setIsAnime={setIsAnime} />

        <ListCalender
          navigation={navigation}
          season={season}
          setSeason={setSeason}
          year={year}
          setYear={setYear}
          loading={loading}
          dataList={dataList}
          isAnime={isAnime}
          pageAnimeInc={pageAnimeInc}
          pageMangaInc={pageMangaInc}
          setIsScrolled={setIsScrolled}
          loadingScroll={loadingScroll}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
