import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Catalogue from "../../pages/Catalogue";
import NonID from "../../components/NonID/NonID";
import { useSelector } from "react-redux";
import CardScreen from "../../Screens/CardScreens/CardScreen";
import CatalogueFriend from "../../Screens/CatalogueScreens/CatalogueFriend";

const LibraryStack = createNativeStackNavigator();

export default function CatalogueStack() {
  const isLogged = useSelector((state) => state.User.isLogged);
  return (
    <LibraryStack.Navigator
      initialRouteName={isLogged ? "Catalogue" : "Connexion"}
      screenOptions={{ headerShown: false }}
    >
      {!isLogged && <LibraryStack.Screen name="Connexion" component={NonID} />}
      {isLogged && (
        <>
          <LibraryStack.Screen name="Catalogue" component={Catalogue} />
          <LibraryStack.Screen name="CardScreen" component={CardScreen} />
          <LibraryStack.Screen
            name="CatalogueFriend"
            component={CatalogueFriend}
          />
        </>
      )}
    </LibraryStack.Navigator>
  );
}
