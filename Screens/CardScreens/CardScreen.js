import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";

import { s } from "./CardScreenStyle";
import CardScreenHeader from "../../components/CardScreen/CardScreenHeader";
import Txt from "../../components/Text/Txt";
import Tag from "../../components/Tags/Tag";
import { color5, colorManga, color1, color4 } from "../../utils/Colors";
import Stars from "../../components/stars/Stars";
import ButtonComp from "../../components/Button/ButtonComp";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../Redux/UserSlice";
import axios from "axios";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
export default function CardScreen({ route, navigation }) {
  const userData = useSelector((state) => state.User.userData);
  const userId = useSelector((state) => state.User.userId);
  const { data } = route.params;
  const isLogged = useSelector((state) => state.User.isLogged);

  const [infos, setInfos] = useState({
    bookmark: "",
    commentary: "",
    msgBookMark: "",
    msgCommentary: "",
  });
  const dispatch = useDispatch();
  const isInCollecList = userData.colleclist.find(
    (card) => card.mal_id === data.mal_id
  );

  const itemIndex = isInCollecList
    ? userData.colleclist?.findIndex((element) => element.mal_id == data.mal_id)
    : null;
  const dataBookCommentary = (condition) => {
    if (isLogged && condition === "commentary") {
      return isInCollecList && userData.colleclist[itemIndex].commentary
        ? userData.colleclist[itemIndex].commentary
        : infos.commentary;
    } else if (isLogged && condition === "bookmark") {
      return isInCollecList && userData.colleclist[itemIndex].bookMarkValue
        ? userData.colleclist[itemIndex].bookMarkValue
        : infos.bookmark;
    } else {
      return "";
    }
  };
  const commentary = dataBookCommentary("commentary");
  const bookmark = dataBookCommentary("bookmark");

  async function AddColleclist() {
    try {
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
        dispatch(getUserData(userId));
        console.log("Element ajouté à la liste");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function RemoveColleclist() {
    try {
      if (isInCollecList) {
        const response = await axios({
          method: "delete",
          url: `https://server-yondemangacollec.onrender.com/api/user/colleclistdelete/${userId}/${data.mal_id}`,
        });
        const responselevel = await axios({
          method: "patch",
          url: `https://server-yondemangacollec.onrender.com/api/user/colleclistlevelremovepatch/${userId}`,
        });
        dispatch(getUserData(userId));
        console.log("élement supprimé");
      } else {
        return console.log("Déjà dans la liste");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function BookMarkPatch() {
    try {
      const response = await axios({
        method: "patch",
        url: `https://server-yondemangacollec.onrender.com/api/user/colleclistbookmarkpatch/${userId}/${data.mal_id}`,
        data: { bookMarkValue: infos.bookmark },
      });
      dispatch(getUserData(userId));
      setInfos((prev) => {
        return {
          ...prev,
          msgBookMark: response.data.message,
        };
      });
      setTimeout(() => {
        setInfos((prev) => {
          return {
            ...prev,
            msgBookMark: "",
          };
        });
      }, 2000);
    } catch (err) {
      setInfos((prev) => {
        return {
          ...prev,
          msgBookMark: "Une erreur est survenue...",
        };
      });
      setTimeout(() => {
        setInfos((prev) => {
          return {
            ...prev,
            msgBookMark: "",
          };
        });
      }, 2000);
    }
  }
  async function CommentaryPatch() {
    try {
      const response = await axios({
        method: "patch",
        url: `https://server-yondemangacollec.onrender.com/api/user/colleclistcommentarypatch/${userId}/${data.mal_id}`,
        data: { commentary: infos.commentary },
      });
      dispatch(getUserData(userId));
      setInfos((prev) => {
        return {
          ...prev,
          msgCommentary: response.data.message,
        };
      });
      setTimeout(() => {
        setInfos((prev) => {
          return {
            ...prev,
            msgCommentary: "",
          };
        });
      }, 2000);
    } catch (err) {
      setInfos((prev) => {
        return {
          ...prev,
          msgCommentary: "Une erreur est survenue...",
        };
      });
      setTimeout(() => {
        setInfos((prev) => {
          return {
            ...prev,
            msgCommentary: "",
          };
        });
      }, 2000);
    }
  }

  return (
    <View style={s.container}>
      <ScrollView nestedScrollEnabled={true}>
        <View style={s.sousContainer}>
          <CardScreenHeader
            img={data.images.jpg.image_url}
            bigImg={data.images.jpg.large_image_url}
            navigation={navigation}
          />
          <Txt styles={s.title}>{data.title}</Txt>
          <Txt styles={s.title2}>{data.title_english}</Txt>
          <View style={s.tagsContainer}>
            {data.genres &&
              data.genres.map((element) => {
                return <Tag key={element.mal_id}>{element.name}</Tag>;
              })}
            <Tag
              v={
                data.type === "TV"
                  ? { backgroundColor: color1 }
                  : { backgroundColor: colorManga }
              }
              t={{ color: color5 }}
            >
              {data.type}
            </Tag>
          </View>
          <Stars data={data} />

          <View style={s.synopsis}>
            <ScrollView nestedScrollEnabled={true}>
              <Txt>{data.synopsis}</Txt>
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
              >
                {isInCollecList
                  ? "Supprimer de la collection"
                  : "Ajouter à la collection"}
              </ButtonComp>
              {isInCollecList && (
                <>
                  <View style={s.elementcontainer}>
                    <Txt>Marque-page :</Txt>
                    <TextInput
                      placeholder="N° épisode ou scan..."
                      keyboardType="numeric"
                      inputMode="numeric"
                      style={s.element}
                      onSubmitEditing={BookMarkPatch}
                      value={bookmark}
                      onChangeText={(e) =>
                        setInfos((prev) => {
                          return {
                            ...prev,
                            bookmark: e,
                          };
                        })
                      }
                    />
                    <Txt styles={{ color: "green", textAlign: "center" }}>
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
                      value={commentary}
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
                    >
                      <Ionicons name="checkmark" size={24} color={"green"} />
                    </TouchableOpacity>
                    <Txt styles={{ color: "green", textAlign: "center" }}>
                      {infos.msgCommentary}
                    </Txt>
                  </View>
                  <Stars
                    data={data}
                    isLogged={isLogged}
                    userId={userId}
                    userData={userData}
                    isInCollecList={isInCollecList}
                  />
                </>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
