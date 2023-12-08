import React from "react";
import { s } from "./FiltreStyle";
import { View, ScrollView } from "react-native";
import Tag from "../Tags/Tag";
import { color5 } from "../../utils/Colors";

export default function OptionsSelected({
  isAnime,
  filterOptions,
  RemoveCategoryOptions,
  RemoveOption,
}) {
  const iconColor = color5;
  const iconSize = 10;
  return (
    <View style={s.optionsselectedcontainer}>
      {isAnime && (
        <ScrollView contentContainerStyle={s.optionsselected}>
          {filterOptions.animeGenres.map((filter) => (
            <Tag
              key={filter.id + "ag"}
              t={s.tagtext}
              v={[s.tag, s.tagGenre]}
              onPress={() => RemoveOption(filter.name)}
              name="close"
              color={iconColor}
              size={iconSize}
            >
              {filter.name}
            </Tag>
          ))}
          {filterOptions.studios.map((filter) => (
            <Tag
              key={filter.id + "s"}
              t={s.tagtext}
              v={[s.tag, s.tagStudio]}
              onPress={() => RemoveOption(filter.name)}
              name="close"
              color={iconColor}
              size={iconSize}
            >
              {filter.name}
            </Tag>
          ))}
        </ScrollView>
      )}
      {!isAnime && (
        <ScrollView contentContainerStyle={s.optionsselected}>
          {filterOptions.mangaGenres.map((filter) => (
            <Tag
              key={filter.id + "mg"}
              t={s.tagtext}
              v={[s.tag, s.tagGenre]}
              onPress={() => RemoveOption(filter.name)}
              name="close"
              color={iconColor}
              size={iconSize}
            >
              {filter.name}
            </Tag>
          ))}
          {filterOptions.magazines.map((filter) => (
            <Tag
              key={filter.id + "m"}
              t={s.tagtext}
              v={[s.tag, s.tagStudio]}
              onPress={() => RemoveOption(filter.name)}
              name="close"
              color={iconColor}
              size={iconSize}
            >
              {filter.name}
            </Tag>
          ))}
        </ScrollView>
      )}
      {isAnime &&
        (filterOptions.animeGenres.length > 0 ||
          filterOptions.studios.length > 0) && (
          <Tag
            v={s.tagstitlec}
            t={s.tagstitlet}
            onPress={RemoveCategoryOptions}
          >
            Supprimer filtres
          </Tag>
        )}
      {!isAnime &&
        (filterOptions.mangaGenres.length > 0 ||
          filterOptions.magazines.length > 0) && (
          <Tag
            v={s.tagstitlec}
            t={s.tagstitlet}
            onPress={RemoveCategoryOptions}
          >
            Supprimer filtres
          </Tag>
        )}
    </View>
  );
}
