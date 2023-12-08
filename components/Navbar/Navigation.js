import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import CatalogueStack from "../../Stacks/CatalogueStack/CatalogueStack";
import RechercheStack from "../../Stacks/RechercheStack/RechercheStack";
import CompteStack from "../../Stacks/CompteStack/CompteStack";
import AccueilStack from "../../Stacks/AccueilStack/AccueilStack";
import { color1 } from "../../utils/Colors";
import { color4 } from "../../utils/Colors";
import CalendrierStack from "../../Stacks/CalendrierStack/CalendrierStack";
export const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator
      initialRouteName="Accueil"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "AccueilStack") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "CatalogueStack") {
            iconName = focused ? "library" : "library-outline";
          } else if (route.name === "CalendrierStack") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "RechercheStack") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "CompteStack") {
            iconName = focused ? "person" : "person-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: color1,
        tabBarInactiveTintColor: color4,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="AccueilStack"
        component={AccueilStack}
        options={{ title: "Accueil" }}
      />
      <Tab.Screen
        name="CatalogueStack"
        component={CatalogueStack}
        options={{ title: "Catalogue" }}
      />
      <Tab.Screen
        name="CalendrierStack"
        component={CalendrierStack}
        options={{ title: "Calendrier" }}
      />
      <Tab.Screen
        name="RechercheStack"
        component={RechercheStack}
        options={{ title: "Recherche" }}
      />
      <Tab.Screen
        name="CompteStack"
        component={CompteStack}
        options={{ title: "Compte" }}
      />
    </Tab.Navigator>
  );
}
