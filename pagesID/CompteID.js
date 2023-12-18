import { View, ImageBackground, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authReducer, getUserData } from "../Redux/UserSlice";
import bg from "../assets/onizukabg.jpg";
import img from "../assets/onizuka.jpg";
import { s } from "../components/CatalogueHeader/CatalogueHeaderStyle";
import Txt from "../components/Text/Txt";
import ButtonComp from "../components/Button/ButtonComp";
import ConvertDateFormat from "../utils/ConvertDateFormat";
import ModalComp from "./ModalComp";
export default function CompteID() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.User.userId);
  const userData = useSelector((state) => state.User.userData);


  const verifData = userData && userData;
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
    errors: {
      email: "",
      password: "",
      pseudo: "",
    },
    success: {
      email: "",
      password: "",
      pseudo: "",
    },
    loading: false,
  });
  console.log(infos.errors.password);

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
      dispatch(authReducer(false));
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
  return (
    <View style={{ flex: 1, gap: 15 }}>
      <ImageBackground source={bg} resizeMode="cover" style={s.bg}>
        <Image source={img} style={s.img} />
      </ImageBackground>
      <View style={s.infos}>
        <Txt styles={s.title}>{verifData.pseudo}</Txt>
        <Txt styles={s.level}>Niveau {verifData.level} </Txt>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={s.lines}>
          <Txt styles={[s.texttitle, { fontFamily: "Literata-SemiBold" }]}>
            Gestion du compte
          </Txt>
          <View style={s.line}>
            <Txt styles={s.texttitle}>Email {verifData.email}</Txt>
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
            <Txt styles={s.texttitle}>Nom d'utilisateur {verifData.pseudo}</Txt>
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
            <Txt>Compte créé le {ConvertDateFormat(userData.createdAt)}</Txt>
          </View>
          <TouchableOpacity>
            <View style={s.line}>
              <Txt>J'aime l'App ♡</Txt>
              <Txt>Suivez moi sur Github !</Txt>
            </View>
          </TouchableOpacity>
        </View>

        <ButtonComp
          onPress={() =>
            setInfos((prev) => {
              return {
                ...prev,
                modalVisible: !prev.modalVisible,
              };
            })
          }
        >
          Déconnexion
        </ButtonComp>
      </View>
      <ModalComp
        infos={infos}
        setInfos={setInfos}
        logout={logout}
        changeEmail={changeEmail}
        changePseudo={changePseudo}
        changePassword={changePassword}
      />
    </View>
  );
}
