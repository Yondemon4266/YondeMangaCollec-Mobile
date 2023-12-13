import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Catalogue from "../../pages/Catalogue";
import NonID from "../../components/NonID/NonID";
import { useSelector } from "react-redux";
import CardScreen from "../../Screens/CardScreens/CardScreen";

const LibraryStack = createNativeStackNavigator();

export default function CatalogueStack() {
  const isLogged = useSelector((state) => state.User.isLogged);
  return (
    <LibraryStack.Navigator
      initialRouteName={isLogged ? "Catalogue" : "Connexion"}
    >
      {!isLogged && <LibraryStack.Screen name="Connexion" component={NonID} />}
      {isLogged && (
        <>
          <LibraryStack.Screen name="Catalogue" component={Catalogue} />
          <LibraryStack.Screen name="CardScreen" component={CardScreen} />
        </>
      )}
    </LibraryStack.Navigator>
  );
}
