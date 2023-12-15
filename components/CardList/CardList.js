import { View, Text, FlatList } from "react-native";
import React from "react";
import Card from "../Card/Card";
import { v4 as uuidv4 } from "uuid";

export default function CardList({
  isAnime,
  displayedData,
  dispatch,
  pageAnime,
  pageManga,
  loading,
  navigation,
}) {
  return (
    <FlatList
      data={
        isAnime
          ? displayedData && displayedData.animes
          : displayedData && displayedData.mangas
      }
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
      onEndReached={() =>
        isAnime
          ? dispatch({
              type: "SET_PAGE_ANIME",
              payload: pageAnime + 1,
            })
          : dispatch({
              type: "SET_PAGE_MANGA",
              payload: pageManga + 1,
            })
      }
    />
  );
}
