import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Compte from "../../pages/Compte";
import { useSelector } from "react-redux";
import CompteID from "../../pagesID/CompteID";
import ConnexionReussi from "../../Screens/CompteScreens/ConnexionReussi";
import Univers from "../../components/Univers/Univers";
import SelectVillageMarine from "../../components/Univers/SelectVillageMarine";
import SelectMarineOrPirate from "../../components/Univers/SelectMarineOrPirate";
import { HeaderBackButton, useNavigation } from "@react-navigation/native";

const AccountStack = createNativeStackNavigator();

export default function CompteStack() {
  const isLogged = useSelector((state) => state.User.isLogged);
  const optionsFinished = useSelector((state) => state.User.optionsFinished);
  const navigation = useNavigation();
  React.useEffect(() => {
    const handleBackPress = () => {
      // Retournez true pour désactiver la fonctionnalité de retour
      return true;
    };

    // Ajoutez ou supprimez le gestionnaire d'événements de bouton de retour en fonction de l'état actuel
    if (!optionsFinished) {
      navigation.setOptions({
        headerLeft: () => (
          <HeaderBackButton onPress={() => handleBackPress()} />
        ),
      });
    } else {
      // Réinitialisez le bouton de retour à sa valeur par défaut si les options sont terminées
      navigation.setOptions({
        headerLeft: undefined,
      });
    }
  }, [optionsFinished, navigation]);
  return (
    <AccountStack.Navigator
      initialRouteName={isLogged ? "CompteID" : "Compte"}
      screenOptions={{ headerShown: false }}
    >
      <AccountStack.Screen
        name={isLogged ? "CompteID" : "Compte"}
        component={isLogged ? CompteID : Compte}
      />

      {!optionsFinished && (
        <>
          <AccountStack.Screen
            name={"ConnexionReussi"}
            component={ConnexionReussi}
          />

          <AccountStack.Screen name={"Univers"} component={Univers} />
          <AccountStack.Screen
            name={"SelectVillageMarine"}
            component={SelectVillageMarine}
          />
          <AccountStack.Screen
            name={"SelectMarineOrPirate"}
            component={SelectMarineOrPirate}
          />
        </>
      )}
    </AccountStack.Navigator>
  );
}
