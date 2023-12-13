import React, { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import Preparation from "./Hooks/PrepareHook";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./components/Navbar/Navigation";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { appIsReady } = Preparation();
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  return appIsReady ? (
    <View style={{ flex: 1 }}>
      <NavigationContainer onReady={onLayoutRootView}>
        <Navigation />
      </NavigationContainer>
    </View>
  ) : null;
}
