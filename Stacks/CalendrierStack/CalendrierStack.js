import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CardScreen from "../../Screens/CardScreens/CardScreen";
import Calendrier from "../../pages/Calendrier";

const CalendarStack = createNativeStackNavigator();

export default function CalendrierStack() {
  return (
    <CalendarStack.Navigator
      initialRouteName="Calendrier"
      screenOptions={{ headerShown: false }}
    >
      <CalendarStack.Screen name="Calendrier" component={Calendrier} />
      <CalendarStack.Screen name="CardScreen" component={CardScreen} />
    </CalendarStack.Navigator>
  );
}
