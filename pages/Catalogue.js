import React from "react";
import { View } from "react-native";
import { s } from "./CatalogueStyle";
import CatalogueHeader from "../components/CatalogueHeader/CatalogueHeader";
export default function Catalogue({ navigation }) {
  return (
    <View>
      <CatalogueHeader />
    </View>
  );
}
