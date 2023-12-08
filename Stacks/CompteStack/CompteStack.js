import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Compte from "../../pages/Compte";

const AccountStack = createNativeStackNavigator();

export default function CompteStack() {
  return (
    <AccountStack.Navigator
      initialRouteName="Compte"
      screenOptions={{ headerShown: false }}
    >
      <AccountStack.Screen name="Compte" component={Compte} />
    </AccountStack.Navigator>
  );
}
