import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Compte from "../../pages/Compte";
import { useSelector } from "react-redux";
import CompteID from "../../pagesID/CompteID";
import ConnexionReussi from "../../Screens/CompteScreens/ConnexionReussi";

const AccountStack = createNativeStackNavigator();

export default function CompteStack() {
  const isLogged = useSelector((state) => state.User.isLogged);
  return (
    <AccountStack.Navigator
      initialRouteName={isLogged ? "CompteID" : "Compte"}
      screenOptions={{ headerShown: false }}
    >
      <AccountStack.Screen
        name={isLogged ? "CompteID" : "Compte"}
        component={isLogged ? CompteID : Compte}
      />
      {!isLogged && (
        <AccountStack.Screen
          name={"ConnexionReussi"}
          component={ConnexionReussi}
        />
      )}
    </AccountStack.Navigator>
  );
}
