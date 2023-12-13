import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { s } from "./CatalogueStyle";
import CatalogueHeader from "../components/CatalogueHeader/CatalogueHeader";
import CatalogueSpecialCard from "../components/CatalogueSpecialCard/CatalogueSpecialCard";
export default function Catalogue({ navigation }) {
  const [data, setData] = useState([]);
  return (
    <View>
      <ScrollView>
        <CatalogueHeader />
        {/* <CatalogueSpecialCard /> */}
      </ScrollView>
    </View>
  );
}
