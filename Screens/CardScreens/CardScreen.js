import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";

import { s } from "./CardScreenStyle";
import CardScreenHeader from "../../components/CardScreen/CardScreenHeader";
import Txt from "../../components/Text/Txt";
import Tag from "../../components/Tags/Tag";
import { color5, colorManga, color1 } from "../../utils/Colors";
import Stars from "../../components/stars/Stars";
import ButtonComp from "../../components/Button/ButtonComp";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../Redux/UserSlice";
import axios from "axios";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
export default function CardScreen({ route, navigation }) {
  const userId = useSelector((state) => state.User.userId);
  const userData = useSelector((state) => state.User.userData);
  const { data, isFriendPage, friendData } = route.params;
  const isLogged = useSelector((state) => state.User.isLogged);

  const isInCollecList =
    isLogged &&
    !isLoading &&
    userData &&
    userData?.colleclist?.find((card) => card.mal_id === data.mal_id);
  const itemIndex =
    isLogged &&
    userData &&
    userData?.colleclist?.findIndex((element) => element.mal_id == data.mal_id);
  const itemIndexFriend =
    isLogged &&
    friendData &&
    friendData?.colleclist?.findIndex(
      (element) => element.mal_id == data.mal_id
    );

  const [infos, setInfos] = useState({
    bookmark:
      isLogged &&
      !isFriendPage &&
      userData &&
      userData?.colleclist[itemIndex]?.bookMarkValue
        ? userData?.colleclist[itemIndex]?.bookMarkValue
        : friendData?.colleclist[itemIndexFriend]?.bookMarkValue
        ? friendData?.colleclist[itemIndexFriend]?.bookMarkValue
        : "",
    commentary:
      isLogged &&
      !isFriendPage &&
      userData &&
      userData?.colleclist[itemIndex]?.commentary
        ? userData?.colleclist[itemIndex]?.commentary
        : friendData?.colleclist[itemIndexFriend]?.commentary
        ? friendData?.colleclist[itemIndexFriend]?.commentary
        : "",
    msgBookMark: "",
    msgCommentary: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const dispatch = useDispatch();

  async function AddColleclist() {
    try {
      setIsLoading(true);
      if (isInCollecList) {
        return console.log("Déjà dans la liste");
      } else {
        const response = await axios({
          method: "patch",
          url: `https://server-yondemangacollec.onrender.com/api/user/colleclistpatch/${userId}`,
          data: {
            colleclist: data,
          },
        });
        const responselevel = await axios({
          method: "patch",
          url: `https://server-yondemangacollec.onrender.com/api/user/colleclistleveladdpatch/${userId}`,
        });
        await dispatch(getUserData(userId));
        console.log("Element ajouté à la liste");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function RemoveColleclist() {
    try {
      setIsLoading(true);
      if (isInCollecList) {
        const response = await axios({
          method: "delete",
          url: `https://server-yondemangacollec.onrender.com/api/user/colleclistdelete/${userId}/${
            data && data.mal_id
          }`,
        });
        const responselevel = await axios({
          method: "patch",
          url: `https://server-yondemangacollec.onrender.com/api/user/colleclistlevelremovepatch/${userId}`,
        });
        await dispatch(getUserData(userId));
        console.log("élement supprimé");
      } else {
        return console.log("Déjà dans la liste");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function BookMarkPatch() {
    try {
      setIsLoading2(true);
      const response = await axios({
        method: "patch",
        url: `https://server-yondemangacollec.onrender.com/api/user/colleclistbookmarkpatch/${userId}/${data.mal_id}`,
        data: { bookMarkValue: infos.bookmark },
      });
      setInfos((prev) => {
        return {
          ...prev,
          msgBookMark: response.data.message,
        };
      });
      await dispatch(getUserData(userId));
    } catch (err) {
      setInfos((prev) => {
        return {
          ...prev,
          msgBookMark: "Une erreur est survenue...",
        };
      });
    } finally {
      setIsLoading2(false);
    }
  }
  async function CommentaryPatch() {
    try {
      setIsLoading2(true);
      const response = await axios({
        method: "patch",
        url: `https://server-yondemangacollec.onrender.com/api/user/colleclistcommentarypatch/${userId}/${
          data && data?.mal_id
        }`,
        data: { commentary: infos.commentary },
      });
      setInfos((prev) => {
        return {
          ...prev,
          msgCommentary: response.data.message,
        };
      });
      await dispatch(getUserData(userId));
    } catch (err) {
      setInfos((prev) => {
        return {
          ...prev,
          msgCommentary: "Une erreur est survenue...",
        };
      });
    } finally {
      setIsLoading2(false);
    }
  }

  return (
    <View style={s.container}>
      <ScrollView nestedScrollEnabled={true}>
        <View style={s.sousContainer}>
          <CardScreenHeader
            img={data && data?.images?.jpg?.image_url}
            bigImg={data && data?.images?.jpg?.large_image_url}
            navigation={navigation}
          />
          <Txt styles={s.title}>{data && data?.title}</Txt>
          <Txt styles={s.title2}>{data && data?.title_english}</Txt>
          <View style={s.tagsContainer}>
            {data &&
              data?.genres &&
              data &&
              data?.genres.map((element) => {
                return <Tag key={element.mal_id}>{element.name}</Tag>;
              })}
            <Tag
              v={
                data && data?.type === "TV"
                  ? { backgroundColor: color1 }
                  : { backgroundColor: colorManga }
              }
              t={{ color: color5 }}
            >
              {data && data?.type}
            </Tag>
          </View>
          <Stars data={data} />

          <View style={s.synopsis}>
            <ScrollView nestedScrollEnabled={true}>
              <Txt>{data && data?.synopsis}</Txt>
            </ScrollView>
          </View>
          {!isLogged && (
            <View style={{ paddingHorizontal: 30, marginTop: 10 }}>
              <ButtonComp
                onPress={() => navigation.navigate("CompteStack")}
                styl={{ alignSelf: "flex-start" }}
              >
                Se connecter
              </ButtonComp>
            </View>
          )}
          {isLogged && (
            <View style={s.loggedcomps}>
              <ButtonComp
                onPress={isInCollecList ? RemoveColleclist : AddColleclist}
                styl={{ alignSelf: "flex-start" }}
                isLoading={isLoading}
              >
                {isInCollecList && "Supprimer de votre collection"}
                {!isInCollecList && "Ajouter à votre collection"}
              </ButtonComp>

              {(isInCollecList || isFriendPage) && (
                <>
                  {!isFriendPage && (
                    <>
                      <View style={s.elementcontainer}>
                        <Txt>Marque-page :</Txt>
                        <TextInput
                          placeholder="N° épisode ou scan..."
                          keyboardType="numeric"
                          inputMode="numeric"
                          style={s.element}
                          value={infos.bookmark}
                          onChangeText={(e) =>
                            setInfos((prev) => {
                              return {
                                ...prev,
                                bookmark: e,
                              };
                            })
                          }
                        />

                        <TouchableOpacity
                          onPress={BookMarkPatch}
                          style={s.submitbutton}
                          disabled={isLoading2}
                        >
                          <Ionicons
                            name="checkmark"
                            size={24}
                            color={"green"}
                          />
                        </TouchableOpacity>
                        {isLoading2 && (
                          <ActivityIndicator
                            size={"large"}
                            style={{
                              position: "absolute",
                              right: "45%",
                              bottom: "45%",
                            }}
                          />
                        )}
                        <Txt
                          styles={{
                            color: "green",
                            textAlign: "center",
                            width: "80%",
                          }}
                        >
                          {infos.msgBookMark}
                        </Txt>
                      </View>
                      <View style={s.elementcontainer}>
                        <Txt>Commentaire sur l'oeuvre</Txt>
                        <TextInput
                          style={[
                            s.element,
                            {
                              minHeight: 80,
                              textAlignVertical: "top",
                              lineHeight: 30,
                            },
                          ]}
                          placeholder="Donnez votre avis ou écrivez des notes."
                          multiline={true}
                          value={infos.commentary}
                          onChangeText={(e) =>
                            setInfos((prev) => {
                              return {
                                ...prev,
                                commentary: e,
                              };
                            })
                          }
                        />
                        <TouchableOpacity
                          onPress={CommentaryPatch}
                          style={s.submitbutton}
                          disabled={isLoading2}
                        >
                          <Ionicons
                            name="checkmark"
                            size={24}
                            color={"green"}
                          />
                        </TouchableOpacity>
                        <Txt
                          styles={{
                            color: "green",
                            textAlign: "center",
                            width: "80%",
                          }}
                        >
                          {infos.msgCommentary}
                        </Txt>
                      </View>
                    </>
                  )}
                  {isFriendPage && (
                    <>
                      <View style={s.elementcontainer}>
                        <View style={s.element}>
                          <Txt>Marque-page : </Txt>
                          <Txt>{infos.bookmark}</Txt>
                        </View>
                      </View>
                      <View style={s.elementcontainer}>
                        <View
                          style={[
                            s.element,
                            {
                              minHeight: 80,
                              textAlignVertical: "top",
                              lineHeight: 30,
                            },
                          ]}
                        >
                          <Txt>Commentaire sur l'oeuvre : </Txt>
                          <Txt>{infos.commentary}</Txt>
                        </View>
                      </View>
                    </>
                  )}
                  {!isFriendPage && (
                    <Stars
                      data={data}
                      isLogged={isLogged}
                      userId={userId}
                      userData={userData}
                      itemIndex={itemIndex}
                    />
                  )}
                  {isFriendPage && (
                    <Stars
                      data={data}
                      isLogged={isLogged}
                      userId={userId}
                      userData={friendData}
                      itemIndex={itemIndexFriend}
                    />
                  )}
                </>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
