import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CardScreen from "../../Screens/CardScreens/CardScreen";
import Recherche from "../../pages/Recherche";
import PageDeRecherche from "../../Screens/RechercheScreens/PageDeRecherche";

const SearchStack = createNativeStackNavigator();

export default function RechercheStack() {
  return (
    <SearchStack.Navigator
      initialRouteName="Recherche"
      screenOptions={{ headerShown: false }}
    >
      <SearchStack.Screen name="Recherche" component={Recherche} />
      <SearchStack.Screen name="PageRecherche" component={PageDeRecherche} />
      <SearchStack.Screen name="CardScreen" component={CardScreen} />
    </SearchStack.Navigator>
  );
}
