import React, { useState } from "react";
import {
  ImageBackground,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { s } from "./CatalogueHeaderStyle";
import bg from "../../assets/onizukabg.jpg";
import img from "../../assets/onizuka.jpg";
import Txt from "../Text/Txt";
import * as Progress from "react-native-progress";
import { SearchBar } from "@rneui/themed";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { color4 } from "../../utils/Colors";
import ButtonComp from "../Button/ButtonComp";
import ConvertDateFormat from "../../utils/ConvertDateFormat";
import { determineGrade } from "../../utils/UniverseUtils";
import { useDispatch } from "react-redux";
import { setIsCompare } from "../../Redux/UserSlice";
export default function CatalogueHeader({
  allUsersData,
  userData,
  friendData,
  navigation,
  isFriendPage,
  isCompare,
  setLoadingCompare,
  searchElement,
  setSearchElement,
}) {
  const dispatch = useDispatch();

  const [searchFriend, setSearchFriend] = useState("");
  const [loading, setLoading] = useState(false);
  const iconSize = 20;
  const progressValue = Number.isInteger(
    isFriendPage ? friendData?.level : userData?.level
  )
    ? 0
    : (isFriendPage ? friendData?.level : userData?.level) % 1;

  function UpdateFriendSearch(text) {
    setSearchFriend(text);
  }
  function ClearFriendSearch() {
    setSearchFriend("");
  }
  function UpdateElementSearch(text) {
    setSearchElement(text);
  }
  function ClearElementSearch() {
    setSearchElement("");
  }

  function GoToFriendPage(user) {
    setLoading(true);
    setSearchFriend("");
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("CatalogueFriend", {
        friendData: user,
        allUsersData: allUsersData,
      });
    }, 1000);
  }

  return (
    <View style={s.container}>
      <ImageBackground
        source={
          isFriendPage && friendData.bgimg
            ? { uri: friendData.bgimg }
            : !isFriendPage && userData.bgimg
            ? { uri: userData.bgimg }
            : bg
        }
        resizeMode="cover"
        style={s.bg}
      >
        <Image
          source={
            isFriendPage && friendData.img
              ? { uri: friendData.img }
              : !isFriendPage && userData.img
              ? { uri: userData.img }
              : img
          }
          style={s.imgcatalogue}
        />
      </ImageBackground>
      <View style={s.infos}>
        <Txt styles={s.title}>
          {isFriendPage ? friendData.pseudo : userData.pseudo}
        </Txt>
        <Txt styles={s.text}>
          {determineGrade(
            isFriendPage
              ? (friendData.level,
                friendData.universe,
                friendData.marineorpirate,
                friendData.island,
                friendData.village)
              : (userData.level,
                userData.universe,
                userData.marineorpirate,
                userData.island,
                userData.village)
          )}
        </Txt>
        <Txt styles={s.text}>
          Membre depuis le{" "}
          {ConvertDateFormat(
            isFriendPage ? friendData.createdAt : userData.createdAt
          )}
        </Txt>
        <Txt styles={s.text}>
          Niveau {Math.floor(isFriendPage ? friendData.level : userData.level)}
        </Txt>
        <Progress.Bar
          progress={progressValue}
          animated={false}
          style={{ alignSelf: "center" }}
          width={180}
          height={14}
          borderRadius={20}
        />
        {loading && (
          <ActivityIndicator size={"large"} style={{ alignSelf: "center" }} />
        )}
      </View>
      <View style={s.searchContainer}>
        <View style={s.search}>
          <Ionicons name="book-outline" size={iconSize} color={color4} />
          <SearchBar
            placeholder="Rechercher une oeuvre..."
            containerStyle={s.searchbarfilters}
            inputContainerStyle={s.searchbarfiltersinput}
            inputStyle={s.searchbartext}
            leftIconContainerStyle={s.searchbaricon}
            lightTheme={true}
            onChangeText={UpdateElementSearch}
            value={searchElement}
            onClear={ClearElementSearch}
          />
        </View>
        <View style={s.search}>
          <MaterialIcons name="group" size={iconSize} color={color4} />
          <SearchBar
            placeholder="Rechercher un ami..."
            containerStyle={s.searchbarfilters}
            inputContainerStyle={s.searchbarfiltersinput}
            inputStyle={s.searchbartext}
            leftIconContainerStyle={s.searchbaricon}
            lightTheme={true}
            onChangeText={UpdateFriendSearch}
            value={searchFriend}
            onClear={ClearFriendSearch}
          />
        </View>
        {searchFriend && (
          <ScrollView
            style={[s.searchlist, s.shadowAndroid, s.shadowIOS]}
            nestedScrollEnabled={true}
          >
            {allUsersData.map((user) => {
              if (
                user.pseudo.toLowerCase().includes(searchFriend.toLowerCase())
              ) {
                return (
                  <TouchableOpacity
                    onPress={() => GoToFriendPage(user)}
                    key={user._id}
                  >
                    <View style={s.searchelement}>
                      <Image
                        style={s.littleimg}
                        source={user.img ? { uri: user.img } : img}
                      />
                      <View style={s.searchelementright}>
                        <View style={s.elementinright}>
                          <Txt styles={s.textelement1}>{user.pseudo}</Txt>
                          <Txt styles={s.textelement2}>Niveau {user.level}</Txt>
                        </View>
                        <Txt styles={[s.textelement2, { textAlign: "center" }]}>
                          {determineGrade(
                            user.level,
                            user.universe,
                            user.marineorpirate,
                            user.island,
                            user.village
                          )}
                        </Txt>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }
            })}
          </ScrollView>
        )}
      </View>
      <View style={s.buttons}>
        <ButtonComp styl={{ alignSelf: "center" }}>Voir Cartes</ButtonComp>
        {isFriendPage && (
          <ButtonComp
            styl={{ alignSelf: "center" }}
            onPress={() => {
              setLoadingCompare(true);
              dispatch(setIsCompare(!isCompare));
              setTimeout(() => {
                setLoadingCompare(false);
              }, 500);
            }}
          >
            Comparer
          </ButtonComp>
        )}
      </View>
    </View>
  );
}
