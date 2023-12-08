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

  useEffect(() => {
    if (isAnime) {
      setLoading(true);
      get(
        `https://api.jikan.moe/v4/seasons/${year}/${season}?sfw&filter=tv&movie&page=1`
      )
        .then((response) => setDataList(response.data.data))
        .catch((error) => console.log("ListCalender", error))
        .finally(() => setLoading(false));
    } else if (!isAnime) {
      setLoading(true);
      get(
        `https://api.jikan.moe/v4/manga?q=&sfw&status=publishing&order_by=popularity&page=1`
      )
        .then((response) => setDataList(response.data.data))
        .catch((error) => console.log("ListCalender", error))
        .finally(() => setLoading(false));
    }
    return () => {
      setDataList([]);
    };
  }, [year, season, isAnime]);

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
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
