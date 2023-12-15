import {
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Txt from "../components/Text/Txt";
import { s } from "./ModalCompStyle";
import { color1 } from "../utils/Colors";

export default function ModalComp({
  infos,
  setInfos,
  logout,
  changeEmail,
  changePseudo,
}) {
  var keyTrue = null;
  for (var cle in infos) {
    if (infos[cle] === true) {
      keyTrue = cle;
      break;
    }
  }

  const HeadTexts = () => {
    if (infos.modalVisible) {
      return "Êtes vous sûr de vouloir vous déconnecter?";
    } else if (infos.emailVisible) {
      return "Changer d'adresse mail";
    } else if (infos.pseudoVisible) {
      return "Changer de pseudo";
    } else if (infos.passwordVisible) {
      return "Changer de mot de passe";
    }
  };

  const InputPlaceholders = () => {
    if (infos.emailVisible) {
      return "Nouvelle adresse mail...";
    } else if (infos.pseudoVisible) {
      return "Nouveau nom d'utilisateur...";
    } else if (infos.passwordVisible) {
      return {
        oldpw: "Ancien mot de passe...",
        newpw: "Nouveau mot de passe...",
        newpwctrl: "Confirmer le mot de passe...",
      };
    }
  };

  const setInputs = (text, pwText) => {
    if (infos.emailVisible) {
      setInfos((prev) => {
        return {
          ...prev,
          email: text,
        };
      });
    } else if (infos.pseudoVisible) {
      setInfos((prev) => {
        return {
          ...prev,
          pseudo: text,
        };
      });
    } else if (infos.passwordVisible) {
      setInfos((prev) => {
        return {
          ...prev,
          [pwText]: text,
        };
      });
    }
  };

  const valeursInputsFunction = () => {
    if (infos.emailVisible) {
      return infos.email;
    } else if (infos.pseudoVisible) {
      return infos.pseudo;
    } else if (infos.passwordVisible) {
      return {
        oldpassword: infos.oldpassword,
        password: infos.password,
        controlPassword: infos.controlPassword,
      };
    }
  };

  const confirmFunctions = async () => {
    if (infos.modalVisible) {
      try {
        setInfos((prev) => {
          return {
            ...prev,
            loading: true,
          };
        });
        await logout();
      } catch (error) {
        console.error("Déconnecté avec erreur?", error);
      } finally {
        setInfos((prev) => {
          return {
            ...prev,
            loading: false,
          };
        });
      }
    } else if (infos.emailVisible) {
      try {
        setInfos((prev) => {
          return {
            ...prev,
            loading: true,
          };
        });
        await changeEmail();
      } catch (error) {
        console.error("Erreur lors du changement d'email :", error);
      } finally {
        setInfos((prev) => {
          return {
            ...prev,
            loading: false,
          };
        });
      }
    } else if (infos.pseudoVisible) {
      try {
        setInfos((prev) => {
          return {
            ...prev,
            loading: true,
          };
        });
        await changePseudo();
      } catch (error) {
        console.error("Erreur lors du changement de pseudo :", error);
      } finally {
        setInfos((prev) => {
          return {
            ...prev,
            loading: false,
          };
        });
      }
    }
  };
  const valeursInputs = valeursInputsFunction();

  const inputPlaceholdersTexts = InputPlaceholders();

  const CenterVisible =
    keyTrue !== null && keyTrue !== "modalVisible" ? true : false;

  const ErrorSuccessMsg = (
    <>
      {!infos.errors.password && infos.success.password && (
        <Txt styles={s.success}>{infos.success.password}</Txt>
      )}
      {!infos.errors.email && infos.success.email && (
        <Txt styles={s.success}>{infos.success.email}</Txt>
      )}
      {!infos.errors.pseudo && infos.success.pseudo && (
        <Txt styles={s.success}>{infos.success.pseudo}</Txt>
      )}

      {!infos.success.password && infos.errors.password && (
        <Txt styles={s.error}>{infos.errors.password}</Txt>
      )}
      {!infos.success.email && infos.errors.email && (
        <Txt styles={s.error}>{infos.errors.email}</Txt>
      )}
      {!infos.success.pseudo && infos.errors.pseudo && (
        <Txt styles={s.error}>{infos.errors.pseudo}</Txt>
      )}
    </>
  );

  return (
    <Modal
      visible={keyTrue !== null ? infos[keyTrue] : false}
      animationType="fade"
      transparent
      onRequestClose={() =>
        setInfos((prev) => {
          return {
            ...prev,
            [keyTrue]: !prev[keyTrue],
          };
        })
      }
    >
      <View style={s.container}>
        <View style={s.sscontainer}>
          <View style={s.top}>
            <Txt styles={{ textAlign: "center", fontSize: 16 }}>
              {HeadTexts()}
            </Txt>
          </View>
          {CenterVisible && (
            <View style={s.center}>
              {infos.passwordVisible ? (
                <>
                  <TextInput
                    placeholder={inputPlaceholdersTexts.oldpw}
                    style={s.input}
                    onChangeText={(e) => setInputs(e, "oldpassword")}
                    value={valeursInputs.oldpassword}
                    secureTextEntry
                  />
                  <TextInput
                    placeholder={inputPlaceholdersTexts.newpw}
                    style={s.input}
                    onChangeText={(e) => setInputs(e, "password")}
                    value={valeursInputs.password}
                    secureTextEntry
                  />
                  <TextInput
                    placeholder={inputPlaceholdersTexts.newpwctrl}
                    style={s.input}
                    onChangeText={(e) => setInputs(e, "controlPassword")}
                    value={valeursInputs.controlPassword}
                    secureTextEntry
                  />
                </>
              ) : (
                <TextInput
                  placeholder={inputPlaceholdersTexts}
                  onChangeText={setInputs}
                  style={s.input}
                  value={valeursInputs}
                />
              )}
              {ErrorSuccessMsg}
            </View>
          )}
          {infos.loading && (
            <ActivityIndicator
              size={"large"}
              style={{
                position: "absolute",
                left: "50%",
                bottom: 0,
                transform: [{ translateX: -20 }],
              }}
            />
          )}
          <View style={s.bottom}>
            <TouchableOpacity
              disabled={infos.loading}
              onPress={() => {
                setInfos((prev) => {
                  return {
                    ...prev,
                    [keyTrue]: !prev[keyTrue],
                  };
                });
              }}
            >
              <Txt styles={[s.bottomtext1, s.bottomtext]}>Annuler</Txt>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={confirmFunctions}
              disabled={infos.loading}
            >
              <Txt styles={[s.bottomtext2, s.bottomtext]}>
                {infos.modalVisible ? "Déconnexion" : "Confirmer"}
              </Txt>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}