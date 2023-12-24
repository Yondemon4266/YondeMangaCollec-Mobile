import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { s } from "./LineMangaStyle";
import Txt from "../Text/Txt";
import ButtonComp from "../Button/ButtonComp";
import ConvertDateFormat, { ConvertDay } from "../../utils/ConvertDateFormat";
import TextTruncate from "../../Hooks/TextTruncate";
import { color1, colorManga } from "../../utils/Colors";

export default function LineManga({ data, navigation }) {
  const airedOrPublished = data.aired?.from
    ? data.aired.from
    : data.published?.from
    ? data.published.from
    : "";
    

  return (
    <TouchableOpacity
      style={s.container}
      onPress={() => navigation.navigate("CardScreen", { data: data })}
    >
      <View style={s.left}>
        <Txt styles={s.text}>
          {airedOrPublished
            ? `Début : ${ConvertDateFormat(airedOrPublished)}`
            : ""}
        </Txt>
        <Txt>{TextTruncate(data.title, s.text2)}</Txt>
        {data.type === "TV" ? (
          <Txt styles={s.text}>
            {data.episodes === null ? "" : `Épisodes : ${data.episodes}`}
          </Txt>
        ) : null}
      </View>
      <View style={s.center}>
        <ButtonComp
          textstyl={s.text}
          disabled={true}
          styl={
            data.type === "TV"
              ? { backgroundColor: color1 }
              : { backgroundColor: colorManga }
          }
        >
          {data.type === "TV" ? "ANIME" : "MANGA"}
        </ButtonComp>
      </View>
      <View style={s.right}>
        {data.broadcast ? (
          <Txt styles={s.textimage}>{ConvertDay(data.broadcast.day)}</Txt>
        ) : null}
        <Image source={{ uri: data.images.jpg.image_url }} style={s.img} />
      </View>
    </TouchableOpacity>
  );
}
