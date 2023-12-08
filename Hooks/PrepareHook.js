import { useEffect, useState } from "react";
import lm from "../assets/fonts/Literata-Medium.ttf";
import lr from "../assets/fonts/Literata-Regular.ttf";
import lsb from "../assets/fonts/Literata-SemiBold.ttf";
import * as Font from "expo-font";
export default function Preparation() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Literata-Medium": lm,
          "Literata-SemiBold": lsb,
          "Literata-Regular": lr,
        });

        setAppIsReady(true);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  return { appIsReady };
}
