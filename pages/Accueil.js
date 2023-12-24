import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import HeaderAccueil from "../components/HeaderAccueil/HeaderAccueil";
import Card from "../components/Card/Card";
import Txt from "../components/Text/Txt";
import { s } from "../pages/AccueilStyle";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Accueil({ navigation }) {
  const [mangaNews, setMangaNews] = useState([]);
  const [animeNews, setAnimeNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [collectionList, setCollectionList] = useState([]);
  const isLogged = useSelector((state) => state.User.isLogged);
  const userData = useSelector((state) => state.User.userData);

  useEffect(() => {
    async function loadMangaAnime() {
      try {
        const response1 = await axios({
          method: "get",
          url: "https://api.jikan.moe/v4/top/anime?q=&sfw&filter=bypopularity&filter=airing&type=tv&movie&rating=pg13&r&r17",
        });
        setAnimeNews(response1.data.data);
        const response2 = await axios({
          method: "get",
          url: "https://api.jikan.moe/v4/top/manga?q=&sfw&filter=bypopularity&filter=publishing",
        });
        setMangaNews(response2.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadMangaAnime();
  }, []);

  useEffect(() => {
    if (isLogged) {
      if (!isLoading && userData) {
        const isInCollecList =
          userData &&
          userData.colleclist &&
          userData.colleclist.filter(
            (element) =>
              (mangaNews &&
                mangaNews.filter((manga) => manga.mal_id === element.mal_id)) ||
              (animeNews &&
                animeNews.filter((anime) => anime.mal_id === element.mal_id))
          );
        setCollectionList(
          isInCollecList
            ? !isLoading &&
                userData &&
                isLogged &&
                isInCollecList.map((element) => element.mal_id)
            : null
        );
      }
    }
  }, [userData, isLoading]);

  function isCardInCollection(id) {
    if (isLogged) {
      if (!isLoading && collectionList) {
        return collectionList.includes(id);
      }
    }
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ gap: 10 }}>
        <HeaderAccueil />
        <Txt styles={{ fontSize: 20, textAlign: "center" }}>
          Oeuvres en cours
        </Txt>
        <Txt styles={s.text}>Animés</Txt>
        <View style={s.cardlist}>
          {animeNews &&
            animeNews.map((card) => (
              <Card
                key={card.mal_id}
                data={card}
                navigation={navigation}
                anime={true}
                isInCollection={isCardInCollection(card.mal_id)}
                userData={userData}
              />
            ))}
        </View>

        <Txt styles={[s.text, s.text2]}>Mangas</Txt>

        <View style={s.cardlist}>
          {mangaNews &&
            mangaNews.map((card) => (
              <Card
                key={card.mal_id}
                data={card}
                navigation={navigation}
                anime={false}
                isInCollection={isCardInCollection(card.mal_id)}
                userData={userData}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
