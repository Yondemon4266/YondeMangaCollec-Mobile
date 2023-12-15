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

  const renderTags = (filters, type) => {
    return (
      <ScrollView contentContainerStyle={s.optionsselected}>
        {filters.map((filter) => (
          <Tag
            key={filter.id + type}
            t={s.tagtext}
            v={[s.tag, type === "ag" || "mg" ? s.tagGenre : s.tagStudio]}
            onPress={() => RemoveOption(filter.name)}
            name="close"
            color={iconColor}
            size={iconSize}
          >
            {filter.name}
          </Tag>
        ))}
      </ScrollView>
    );
  };

  const renderDeleteButton = (filters) => {
    return (
      filters.length > 0 && (
        <Tag v={s.tagstitlec} t={s.tagstitlet} onPress={RemoveCategoryOptions}>
          Supprimer filtres
        </Tag>
      )
    );
  };

  return (
    <View style={s.optionsselectedcontainer}>
      {isAnime ? (
        <>
          {renderTags(filterOptions.animeGenres, "ag")}
          {renderTags(filterOptions.studios, "s")}
        </>
      ) : (
        <>
          {renderTags(filterOptions.mangaGenres, "mg")}
          {renderTags(filterOptions.magazines, "m")}
        </>
      )}

      {renderDeleteButton(
        isAnime ? filterOptions.animeGenres : filterOptions.mangaGenres
      )}
    </View>
  );
}
