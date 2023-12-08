import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Catalogue from "../../pages/Catalogue";
import NonID from "../../components/NonID/NonID";

const LibraryStack = createNativeStackNavigator();

export default function CatalogueStack() {
  const [isLogged, setIsLogged] = useState(true);
  return (
    <LibraryStack.Navigator
      initialRouteName={isLogged ? "Catalogue" : "Connexion"}
    >
      <LibraryStack.Screen name="Connexion" component={NonID} />
      <LibraryStack.Screen name="Catalogue" component={Catalogue} />
    </LibraryStack.Navigator>
  );
}
