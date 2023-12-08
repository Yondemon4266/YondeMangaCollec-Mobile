import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import HeaderAccueil from "../components/HeaderAccueil/HeaderAccueil";
import Card from "../components/Card/Card";
import Txt from "../components/Text/Txt";
import { s } from "../pages/AccueilStyle";

import { color1 } from "../utils/Colors";
import axios from "axios";

export default function Accueil({ navigation }) {
  const [mangaNews, setMangaNews] = useState([]);
  const [animeNews, setAnimeNews] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.jikan.moe/v4/top/anime?q=&sfw&filter=bypopularity&filter=airing&type=tv&movie&rating=pg13&r&r17"
      )
      .then((response) => setAnimeNews(response.data.data))
      .catch((error) => console.log(error));
    axios
      .get(
        "https://api.jikan.moe/v4/top/manga?q=&sfw&filter=bypopularity&filter=publishing"
      )
      .then((response) => setMangaNews(response.data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ gap: 10 }}>
        <HeaderAccueil />
        <Txt styles={{ fontSize: 20, textAlign: "center" }}>
          Œuvres en cours
        </Txt>
        <Txt styles={s.text}>Animés</Txt>
        <View style={s.cardlist}>
          {animeNews.map((card) => (
            <Card key={card.mal_id} data={card} navigation={navigation} />
          ))}
        </View>

        <Txt styles={[s.text, s.text2]}>Mangas</Txt>

        <View style={s.cardlist}>
          {mangaNews.map((card) => (
            <Card key={card.mal_id} data={card} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
