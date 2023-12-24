import React from "react";
import Card from "../Card/Card";
import Txt from "../Text/Txt";
import { ActivityIndicator, View } from "react-native";
import { s } from "./CatalogueContentStyle";

export default function CatalogueContent({
  userData,
  friendData,
  navigation,
  isFriendPage,
  isCompare,
  loadingCompare,
  searchElement,
}) {
  function compareCollections() {
    let common = [];
    let differentFriend = [];
    let differentUser = [];
    if (isFriendPage && userData && friendData) {
      friendData?.colleclist?.forEach((friendelement) => {
        const match =
          userData &&
          userData?.colleclist?.find(
            (userelement) => userelement.mal_id === friendelement.mal_id
          );

        if (match) {
          common.push(friendelement);
        } else {
          differentFriend.push(friendelement);
        }
      });
      userData &&
        userData?.colleclist?.forEach((userelement) => {
          const match =
            friendData &&
            friendData?.colleclist?.find(
              (friendelement) => friendelement.mal_id === userelement.mal_id
            );
          if (!match) {
            differentUser.push(userelement);
          }
        });
    }
    return { common, differentFriend, differentUser };
  }

  const DisplayCards = () => {
    if (loadingCompare) {
      return <ActivityIndicator size={"large"} />;
    } else {
      if (isCompare && isFriendPage) {
        const { common, differentFriend, differentUser } = compareCollections();
        return (
          <>
            <View style={[s.container, s.commonColor]}>
              <Txt styles={[s.text, s.commonTextColor]}>
                Éléments en communs
              </Txt>
              <View style={s.cardcontainer}>
                {common
                  .filter((element) =>
                    searchElement
                      ? element.title
                          .toLowerCase()
                          .includes(searchElement.toLowerCase())
                      : true
                  )
                  .map((element) => (
                    <Card
                      key={element.mal_id}
                      data={element}
                      navigation={navigation}
                      isFriendPage={isFriendPage}
                      userData={userData}
                      friendData={friendData}
                    />
                  ))}
              </View>
            </View>
            <View style={[s.container, s.friendColor]}>
              <Txt styles={[s.text, s.friendTextColor]}>
                Éléments en plus de {friendData.pseudo}
              </Txt>

              <View style={[s.cardcontainer]}>
                {differentFriend
                  .filter((element) =>
                    searchElement
                      ? element.title
                          .toLowerCase()
                          .includes(searchElement.toLowerCase())
                      : true
                  )
                  .map((element) => (
                    <Card
                      key={element.mal_id}
                      data={element}
                      navigation={navigation}
                      isFriendPage={isFriendPage}
                      userData={userData}
                      friendData={friendData}
                    />
                  ))}
              </View>
            </View>
            <View style={[s.container, s.userColor]}>
              <Txt styles={[s.text, s.userTextColor]}>
                Éléments en plus de {userData.pseudo}
              </Txt>

              <View style={[s.cardcontainer]}>
                {differentUser
                  .filter((element) =>
                    searchElement
                      ? element.title
                          .toLowerCase()
                          .includes(searchElement.toLowerCase())
                      : true
                  )
                  .map((element) => (
                    <Card
                      key={element.mal_id}
                      data={element}
                      navigation={navigation}
                      isFriendPage={isFriendPage}
                      userData={userData}
                      friendData={friendData}
                    />
                  ))}
              </View>
            </View>
          </>
        );
      } else {
        // La logique originale de DisplayCards
        if (!isFriendPage) {
          if (
            userData &&
            userData.colleclist &&
            userData?.colleclist.length > 0
          ) {
            return userData?.colleclist
              ?.filter((element) =>
                searchElement
                  ? element.title
                      .toLowerCase()
                      .includes(searchElement.toLowerCase())
                  : true
              )
              .map((element) => (
                <Card
                  key={element.mal_id}
                  data={element}
                  navigation={navigation}
                  isFriendPage={isFriendPage}
                  userData={userData}
                />
              ));
          } else {
            return (
              <Txt styles={{ textAlign: "center", alignSelf: "center" }}>
                Aucune oeuvre dans votre collection
              </Txt>
            );
          }
        } else {
          if (friendData && friendData?.colleclist.length > 0) {
            return friendData?.colleclist
              ?.filter((element) =>
                searchElement
                  ? element.title
                      .toLowerCase()
                      .includes(searchElement.toLowerCase())
                  : true
              )
              .map((element) => (
                <Card
                  key={element.mal_id}
                  data={element}
                  navigation={navigation}
                  isFriendPage={isFriendPage}
                  userData={userData}
                  friendData={friendData}
                />
              ));
          } else {
            return (
              <Txt styles={{ textAlign: "center", alignSelf: "center" }}>
                Aucune oeuvre dans la collection de votre ami
              </Txt>
            );
          }
        }
      }
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {DisplayCards()}
    </View>
  );
}
