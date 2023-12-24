import React, { useMemo } from "react";
import { View, ScrollView, ActivityIndicator, FlatList } from "react-native";
import LineManga from "../LineManga/LineManga";
import { s } from "../LineManga/LineMangaStyle";
import { color1, color5 } from "../../utils/Colors";
import ButtonComp from "../Button/ButtonComp";
import Txt from "../Text/Txt";
import { yearDownLimit, yearUpLimit } from "../../utils/YearLimit";
import { convertSeason } from "../../utils/GetSeasonNow";
export default function ListCalender({
  navigation,
  season,
  setSeason,
  year,
  setYear,
  loading,
  dataList,
  isAnime,
  pageAnimeInc,
  pageMangaInc,
  setIsScrolled,
  loadingScroll,
}) {
  const seasonsList = ["winter", "spring", "summer", "fall"];
  const iconSize = 24;
  const iconColor = color5;

  function oldSeasonChange() {
    setSeason((prevSeason) => seasonsList[seasonsList.indexOf(prevSeason) - 1]);
    if (season === "winter") {
      setSeason("fall");
      if (year > yearDownLimit) setYear((prevYear) => prevYear - 1);
    }
  }
  function nextSeasonChange() {
    setSeason((prevSeason) => seasonsList[seasonsList.indexOf(prevSeason) + 1]);
    if (season === "fall") {
      setSeason("winter");
      if (year < yearUpLimit) setYear((prevYear) => prevYear + 1);
    }
  }

  return (
    <>
      <View style={isAnime ? s.lineseason : s.lineseasonmanga}>
        {isAnime && (
          <ButtonComp
            onPress={oldSeasonChange}
            disabled={year === yearDownLimit && season === "winter"}
            styl={{ alignSelf: "flex-start", backgroundColor: "transparent" }}
            name="arrow-back"
            size={iconSize}
            color={iconColor}
          />
        )}
        <Txt styles={{ color: color5 }}>
          {isAnime ? convertSeason(season) + " " + year : "MANGA"}
        </Txt>
        {isAnime && (
          <ButtonComp
            onPress={nextSeasonChange}
            disabled={year === yearUpLimit && season === "fall"}
            styl={{ alignSelf: "flex-start", backgroundColor: "transparent" }}
            name="arrow-forward"
            size={iconSize}
            color={iconColor}
          />
        )}
      </View>

      <>
        {loading ? (
          <View style={s.loadingContainer}>
            <ActivityIndicator size="large" color={color1} />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
            }}
          >
            <FlatList
              data={dataList}
              renderItem={({ item }) => (
                <LineManga
                  key={item.mal_id}
                  data={item}
                  navigation={navigation}
                  isAnime={isAnime}
                />
              )}
              onEndReached={() => {
                setIsScrolled(true);
                if (isAnime) {
                  pageAnimeInc();
                } else {
                  pageMangaInc();
                }
              }}
            />
            {loadingScroll && (
              <ActivityIndicator
                size={"large"}
                style={{
                  alignSelf: "center",
                  position: "absolute",
                  bottom: 10,
                }}
              />
            )}
          </View>
        )}
      </>
    </>
  );
}
