import React from "react";
import { ScrollView, View } from "react-native";
import CatalogueHeader from "../components/CatalogueHeader/CatalogueHeader";
import { useSelector } from "react-redux";
import CatalogueContent from "../components/CatalogueHeader/CatalogueContent";

export default function Catalogue({ navigation }) {
  const userData = useSelector((state) => state.User.userData);
  const allUsersData = useSelector((state) => state.AllUsers.AllUsersData);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <CatalogueHeader
          allUsersData={allUsersData}
          userData={userData}
          navigation={navigation}
        />
        {/* <CatalogueSpecialCard /> */}
        <CatalogueContent userData={userData} navigation={navigation} />
      </ScrollView>
    </View>
  );
}
