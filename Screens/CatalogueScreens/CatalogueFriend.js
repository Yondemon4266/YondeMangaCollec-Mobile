import { ScrollView, View } from "react-native";
import React, { useState } from "react";
import CatalogueHeader from "../../components/CatalogueHeader/CatalogueHeader";
import CatalogueContent from "../../components/CatalogueHeader/CatalogueContent";
import { useSelector } from "react-redux";

export default function CatalogueFriend({ route, navigation }) {
  const { friendData, allUsersData } = route.params;
  const userData = useSelector((state) => state.User.userData);
  const isCompare = useSelector((state) => state.User.isCompare);
  const isFriendPage = true;
  const [loadingCompare, setLoadingCompare] = useState(false);
  const [searchElement, setSearchElement] = useState("");
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <CatalogueHeader
          userData={userData}
          friendData={friendData}
          allUsersData={allUsersData}
          isFriendPage={isFriendPage}
          navigation={navigation}
          isCompare={isCompare}
          setLoadingCompare={setLoadingCompare}
          searchElement={searchElement}
          setSearchElement={setSearchElement}
        />

        <CatalogueContent
          userData={userData}
          friendData={friendData}
          navigation={navigation}
          isFriendPage={isFriendPage}
          isCompare={isCompare}
          loadingCompare={loadingCompare}
          searchElement={searchElement}
        />
      </ScrollView>
    </View>
  );
}
