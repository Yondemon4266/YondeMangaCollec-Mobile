import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CardScreen from "../../Screens/CardScreens/CardScreen";
import Accueil from "../../pages/Accueil";
import CardScreenID from "../../Screens/CardScreens/CardScreenID";
import NonID from "../../components/NonID/NonID";

const HomeStack = createNativeStackNavigator();

export default function AccueilStack() {
  return (
    <HomeStack.Navigator
      initialRouteName="NonID"
      screenOptions={{ headerShown: false }}
    >
      <HomeStack.Screen name="NonID" component={NonID} />
      <HomeStack.Screen name="Accueil" component={Accueil} />
      <HomeStack.Screen name="CardScreen" component={CardScreen} />
      <HomeStack.Screen name="CardScreenID" component={CardScreenID} />
    </HomeStack.Navigator>
  );
}
