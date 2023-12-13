import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CardScreen from "../../Screens/CardScreens/CardScreen";
import Accueil from "../../pages/Accueil";
import CardScreenID from "../../Screens/CardScreens/CardScreenID";
import NonID from "../../components/NonID/NonID";
import { useSelector } from "react-redux";

const HomeStack = createNativeStackNavigator();

export default function AccueilStack() {
  const isLogged = useSelector((state) => state.User.isLogged);

  return (
    <HomeStack.Navigator
      initialRouteName={"Accueil"}
      screenOptions={{ headerShown: false }}
    >
      <HomeStack.Screen name="Accueil" component={Accueil} />

      <HomeStack.Screen name="CardScreen" component={CardScreen} />
    </HomeStack.Navigator>
  );
}
