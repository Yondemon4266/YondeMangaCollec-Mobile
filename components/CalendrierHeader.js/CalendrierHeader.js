import React, { useState } from "react";
import { View } from "react-native";
import Txt from "../Text/Txt";
import { s } from "./CalendrierHeaderStyle";

import ButtonComp from "../Button/ButtonComp";
import AnimeManga from "./AnimeManga";

export default function CalendrierHeader({ isAnime, setIsAnime }) {
  return (
    <>
      <View style={s.header}>
        <Txt styles={s.calendriertext}>Calendrier</Txt>
        <View style={s.headerRight}>
          <ButtonComp styl={[s.button, { width: 150 }]} disabled={true}>
            Sorties
          </ButtonComp>
        </View>
      </View>
      <AnimeManga isAnime={isAnime} setIsAnime={setIsAnime} />
    </>
  );
}
