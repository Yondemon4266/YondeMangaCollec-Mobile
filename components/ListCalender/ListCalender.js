import React, { useMemo } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import LineManga from "../LineManga/LineManga";
import { s } from "../LineManga/LineMangaStyle";
import { color1, color5 } from "../../utils/Colors";
import ButtonComp from "../Button/ButtonComp";
import Txt from "../Text/Txt";
import { yearDownLimit, yearUpLimit } from "../../utils/YearLimit";
export default function ListCalender({
  navigation,
  season,
  setSeason,
  year,
  setYear,
  loading,
  dataList,
  isAnime,
}) {
  const seasonsList = ["winter", "spring", "summer", "fall"];
  const iconSize = 24;
  const iconColor = color5;

  const memoizedLineMangaList = useMemo(() => {
    return dataList.map((anime) => (
      <LineManga
        key={anime.mal_id}
        data={anime}
        navigation={navigation}
        isAnime={isAnime}
      />
    ));
  }, [dataList]);

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
          {isAnime ? season + " " + year : "MANGA"}
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
            <ScrollView>{memoizedLineMangaList}</ScrollView>
          </View>
        )}
      </>
    </>
  );
}
