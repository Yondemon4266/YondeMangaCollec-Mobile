import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Pressable,
  Linking,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  authReducer,
  changeOptionsFinished,
  getUserData,
  getUserId,
} from "../Redux/UserSlice";
import bg from "../assets/onizukabg.jpg";
import img from "../assets/onizuka.jpg";
import { s } from "../components/CatalogueHeader/CatalogueHeaderStyle";
import Cookies from "js-cookie";
import Txt from "../components/Text/Txt";
import ButtonComp from "../components/Button/ButtonComp";
import ConvertDateFormat from "../utils/ConvertDateFormat";
import ModalComp from "./ModalComp";
import { ActivityIndicator } from "react-native";
import { color1, color3, color5 } from "../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
export default function CompteID() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.User.userId);
  const userData = useSelector((state) => state.User.userData);

  const [infos, setInfos] = useState({
    email: "",
    pseudo: "",
    oldpassword: "",
    password: "",
    controlPassword: "",
    emailVisible: false,
    pseudoVisible: false,
    passwordVisible: false,
    modalVisible: false,
    modal2Visible: false,
    confirmDeletion: "",
    errors: {
      email: "",
      password: "",
      pseudo: "",
      delAccount: "",
    },
    success: {
      email: "",
      password: "",
      pseudo: "",
      delAccount: "",
    },
    loading: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  async function logout() {
    try {
      const response = await axios({
        method: "get",
        url: "https://server-yondemangacollec.onrender.com/api/user/logout",
        withCredentials: true,
      });
      console.log("déconnecté !");
    } catch (err) {
      console.log("déconnecté avec erreur ?! ", err);
    } finally {
      Cookies.remove("jwt");
      dispatch(authReducer(false));
      dispatch(changeOptionsFinished(false));
      dispatch(getUserId("p"));
    }
  }

  async function changeEmail() {
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (regexEmail.test(infos.email)) {
      try {
        const response = await axios({
          method: "patch",
          url: `https://server-yondemangacollec.onrender.com/api/user/emailchange/${
            userId && userId
          }`,
          data: {
            email: infos.email,
          },
        });
        if (response) {
          setInfos((prev) => {
            return {
              ...prev,
              success: {
                ...prev.success,
                password: "",
                email: "Votre adresse a été changée avec succès.",
                pseudo: "",
              },
              errors: {
                ...prev.errors,
                pseudo: "",
                password: "",
                email: "",
              },
            };
          });
          dispatch(getUserData(userId));
        }
      } catch (err) {
        setInfos((prev) => {
          return {
            ...prev,
            errors: {
              ...prev.errors,
              email: "Cette adresse email est déjà utilisée",
              password: "",
              pseudo: "",
            },
            success: {
              ...prev.success,
              pseudo: "",
              password: "",
              email: "",
            },
          };
        });
      }
    } else {
      setInfos((prev) => {
        return {
          ...prev,
          errors: {
            ...prev.errors,
            email: "Votre nouvelle adresse n'est pas conforme",
            pseudo: "",
            password: "",
          },
          success: {
            ...prev.success,
            pseudo: "",
            password: "",
            email: "",
          },
        };
      });
    }
  }

  async function changePseudo() {
    if (infos.pseudo.length >= 3) {
      try {
        const response = await axios({
          method: "patch",
          url: `https://server-yondemangacollec.onrender.com/api/user/pseudochange/${
            userId && userId
          }`,
          data: {
            pseudo: infos.pseudo,
          },
        });
        if (response) {
          setInfos((prev) => {
            return {
              ...prev,
              success: {
                ...prev.success,
                pseudo: "Votre pseudo a été changé avec succès.",
                password: "",
                email: "",
              },
              errors: {
                ...prev.errors,
                pseudo: "",
                password: "",
                email: "",
              },
            };
          });
          dispatch(getUserData(userId));
        }
      } catch (err) {
        setInfos((prev) => {
          return {
            ...prev,
            errors: {
              ...prev.errors,
              pseudo: "Ce pseudo est déjà utilisé",
              password: "",
              email: "",
            },
            success: {
              ...prev.success,
              pseudo: "",
              password: "",
              email: "",
            },
          };
        });
      }
    } else {
      setInfos((prev) => {
        return {
          ...prev,
          errors: {
            ...prev.errors,
            pseudo: "Votre nouveau pseudo doit dépasser 3 caractères",
            password: "",
            email: "",
          },
          success: {
            ...prev.success,
            pseudo: "",
            password: "",
            email: "",
          },
        };
      });
    }
  }

  async function changePassword() {
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

    if (infos.password.length < 6 || infos.oldpassword.length < 6) {
      setInfos((prev) => {
        return {
          ...prev,
          errors: {
            ...prev.errors,
            pseudo: "",
            password: "Le mot de passe doît contenir au moins 6 caractères",
            email: "",
          },
          success: {
            ...prev.success,
            pseudo: "",
            password: "",
            email: "",
          },
        };
      });
    } else if (infos.password !== infos.controlPassword) {
      setInfos((prev) => {
        return {
          ...prev,
          errors: {
            ...prev.errors,
            pseudo: "",
            password:
              "Le nouveau mot de passe et la confirmation sont différents",
            email: "",
          },
          success: {
            ...prev.success,
            pseudo: "",
            password: "",
            email: "",
          },
        };
      });
    } else if (!regexPassword.test(infos.password)) {
      setInfos((prev) => {
        return {
          ...prev,
          errors: {
            ...prev.errors,
            pseudo: "",
            password:
              "Le mot de passe doit contenir au moins 6 caractères dont 1 majuscule et 1 chiffre",
            email: "",
          },
          success: {
            ...prev.success,
            pseudo: "",
            password: "",
            email: "",
          },
        };
      });
    } else {
      try {
        const response = await axios({
          method: "patch",
          url: `https://server-yondemangacollec.onrender.com/api/user/passwordchange/${
            userId && userId
          }`,
          data: {
            password: infos.password,
            oldpassword: infos.oldpassword,
          },
        });
        setInfos((prev) => {
          return {
            ...prev,
            errors: {
              ...prev.errors,
              pseudo: "",
              password: "",
              email: "",
            },
            success: {
              ...prev.success,
              pseudo: "",
              password: response.data.message,
              email: "",
            },
          };
        });
        dispatch(getUserData(userId));
      } catch (err) {
        setInfos((prev) => {
          return {
            ...prev,
            errors: {
              ...prev.errors,
              pseudo: "",
              password: err.response.data.message,
              email: "",
            },
            success: {
              ...prev.success,
              pseudo: "",
              password: "",
              email: "",
            },
          };
        });
      }
    }
  }

  async function pickImageAsync(bgorimg) {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
        allowsEditing: true,
      });

      if (result.canceled) {
        alert("Aucune image sélectionnée");
      } else {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("image", {
          uri: result.assets[0].uri,
          name: "image",
          type: "image/jpeg",
        });

        if (bgorimg === "bg") {
          await axios.patch(
            `https://server-yondemangacollec.onrender.com/api/user/bgpatch/${userId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          await dispatch(getUserData(userId));
        } else if (bgorimg === "img") {
          await axios.patch(
            `https://server-yondemangacollec.onrender.com/api/user/imgpatch/${userId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          await dispatch(getUserData(userId));
        }
      }
    } catch (err) {
      console.log(err.response.data.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }

  async function deleteAccount() {
    if (infos.confirmDeletion === "SUPPRIMER") {
      try {
        const response = await axios({
          method: "delete",
          url: `https://server-yondemangacollec.onrender.com/api/user/delete/${userId}`,
        });
        setInfos((prev) => {
          return {
            ...prev,
            errors: {
              ...prev.errors,
              pseudo: "",
              password: "",
              email: "",
              delAccount: "",
            },
            success: {
              ...prev.success,
              pseudo: "",
              password: "",
              email: "",
              delAccount: "Compte supprimé avec succès !",
            },
          };
        });
      
      } catch (error) {
        console.log("erreur lors de la suppression du compte", error);
      } finally {
        setTimeout(() => {
          console.log("ok");
          Cookies.remove("jwt");
          dispatch(authReducer(false));
          dispatch(changeOptionsFinished(false));
          dispatch(getUserId("p"));
        }, 2000);
      }
    } else {
      setInfos((prev) => {
        return {
          ...prev,
          errors: {
            ...prev.errors,
            pseudo: "",
            password: "",
            email: "",
            delAccount: "Écrivez 'SUPPRIMER' en majuscule",
          },
          success: {
            ...prev.success,
            pseudo: "",
            password: "",
            email: "",
            delAccount: "",
          },
        };
      });
    }
  }

  return (
    <View style={{ flex: 1, marginBottom: 20 }}>
      <ScrollView contentContainerStyle={{ gap: 15 }}>
        <Pressable onPress={() => pickImageAsync("bg")}>
          <ImageBackground
            source={
              userData && userData?.bgimg
                ? {
                    uri: `https://server-yondemangacollec.onrender.com/images/${userData.bgimg}`,
                  }
                : bg
            }
            resizeMode="cover"
            style={s.bg}
          />
        </Pressable>
        {isLoading && (
          <ActivityIndicator size={"large"} style={{ zIndex: 10 }} />
        )}
        <Pressable style={s.buttonimg} onPress={() => pickImageAsync("img")}>
          <Image
            source={
              userData && userData?.bgimg
                ? {
                    uri: `https://server-yondemangacollec.onrender.com/images/${userData.img}`,
                  }
                : img
            }
            style={s.img}
          />
        </Pressable>

        <View style={s.infos}>
          <Txt styles={s.title}>{userData && userData.pseudo}</Txt>
          <Txt styles={s.level}>
            Niveau {Math.floor(userData && userData.level)}{" "}
          </Txt>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={s.lines}>
            <Txt styles={[s.texttitle, { fontFamily: "Literata-SemiBold" }]}>
              Gestion du compte
            </Txt>
            <View style={s.line}>
              <Txt styles={s.texttitle}>Email {userData && userData.email}</Txt>
              <TouchableOpacity
                onPress={() =>
                  setInfos((prev) => {
                    return {
                      ...prev,
                      emailVisible: !prev.emailVisible,
                    };
                  })
                }
              >
                <Txt>Modifier</Txt>
              </TouchableOpacity>
            </View>
            <View style={s.line}>
              <Txt styles={s.texttitle}>
                Nom d'utilisateur {userData && userData.pseudo}
              </Txt>
              <TouchableOpacity
                onPress={() =>
                  setInfos((prev) => {
                    return {
                      ...prev,
                      pseudoVisible: !prev.pseudoVisible,
                    };
                  })
                }
              >
                <Txt>Modifier</Txt>
              </TouchableOpacity>
            </View>
            <View style={s.line}>
              <Txt styles={s.texttitle}>Mot de passe</Txt>
              <TouchableOpacity
                onPress={() =>
                  setInfos((prev) => {
                    return {
                      ...prev,
                      passwordVisible: !prev.passwordVisible,
                    };
                  })
                }
              >
                <Txt>Modifier</Txt>
              </TouchableOpacity>
            </View>
            <View style={s.line}>
              <Txt>
                Compte créé le{" "}
                {ConvertDateFormat(userData && userData.createdAt)}
              </Txt>
            </View>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://github.com/Yondemon4266")}
            >
              <View style={s.line}>
                <Txt>J'aime l'App ♡</Txt>
                <Txt>Suivez moi sur Github !</Txt>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ gap: 20 }}>
            <View>
              <ButtonComp
                onPress={() =>
                  setInfos((prev) => {
                    return {
                      ...prev,
                      modalVisible: !prev.modalVisible,
                    };
                  })
                }
                styl={{ height: 40 }}
              >
                Se déconnecter
              </ButtonComp>
            </View>

            <View
              style={{
                height: 50,
                backgroundColor: color3,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Ionicons name={"warning"} size={36} color={color5} />
              <ButtonComp
                onPress={() =>
                  setInfos((prev) => ({
                    ...prev,
                    modal2Visible: !prev.modal2Visible,
                  }))
                }
              >
                Supprimer votre compte
              </ButtonComp>
            </View>
          </View>
        </View>

        <ModalComp
          infos={infos}
          setInfos={setInfos}
          logout={logout}
          changeEmail={changeEmail}
          changePseudo={changePseudo}
          changePassword={changePassword}
          deleteAccount={deleteAccount}
        />
      </ScrollView>
    </View>
  );
}
