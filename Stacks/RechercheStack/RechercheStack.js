import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CardScreen from "../../Screens/CardScreens/CardScreen";
import Recherche from "../../pages/Recherche";
import { SearchProvider } from "../../utils/SearchContext"; // Assurez-vous d'importer correctement le SearchProvider depuis votre contexte

const SearchStack = createNativeStackNavigator();

export default function RechercheStack() {
  return (
    <SearchProvider>
      <SearchStack.Navigator
        initialRouteName="Recherche"
        screenOptions={{ headerShown: false }}
      >
        <SearchStack.Screen name="Recherche" component={Recherche} />
        <SearchStack.Screen name="CardScreen" component={CardScreen} />
      </SearchStack.Navigator>
    </SearchProvider>
  );
}
