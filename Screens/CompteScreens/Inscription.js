import { View, Text, ActivityIndicator } from "react-native";
import { s } from "./Style";
import { useForm } from "react-hook-form";
import Txt from "../../components/Text/Txt";
import CustomInput from "../../components/CustomInput/CustomInput";
import ButtonComp from "../../components/Button/ButtonComp";
import axios from "axios";
import { useEffect, useState } from "react";
import { color1 } from "../../utils/Colors";
import { useDispatch } from "react-redux";
import { authReducer } from "../../Redux/UserSlice";

export default function Inscription({ navigation }) {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm();
  const pwd = watch("password");
  const email = watch("email");

  const onSubmit = async (data) => {
    try {
      const response = await axios({
        method: "post",
        url: `https://server-yondemangacollec.onrender.com/api/user/register`,
        data: {
          pseudo: data.pseudo,
          email: data.email,
          password: data.password,
        },
      });
      if (response) {
        console.log("register réussi", response.data.message);
      }
    } catch (err) {
      const asyncErrors = err.response.data.errors;
      setError("pseudo", {
        type: "manual",
        message: asyncErrors.pseudo,
      });
      setError("email", {
        type: "manual",
        message: asyncErrors.email,
      });
      setError("password", {
        type: "manual",
        message: asyncErrors.password,
      });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      const loginAfterSignUp = async () => {
        try {
          const loginResponse = await axios({
            method: "post",
            url: `https://server-yondemangacollec.onrender.com/api/user/login`,
            withCredentials: true,
            data: {
              email: email,
              password: pwd,
            },
          });
          console.log("login response: ", loginResponse.data.message);
          if (loginResponse) {
            navigation.navigate("ConnexionReussi");
          } else {
            dispatch(authReducer(false));
          }
        } catch (err) {
          console.log("err login", err.response.data.errors);
          dispatch(authReducer(false));
        }
      };
      loginAfterSignUp();
    }
  }, [isSubmitSuccessful, navigation]);
  return (
    <View style={s.container}>
      <Txt styles={s.title}>Créer un compte</Txt>
      <View style={s.content}>
        <CustomInput
          control={control}
          name="pseudo"
          placeholder="Pseudo"
          rules={{
            minLength: {
              value: 3,
              message: "Votre pseudo doit contenir au moins 3 caractères",
            },
            maxLength: {
              value: 20,
              message: "Votre pseudo ne peut excéder 20 caractères",
            },
            required: "Champ requis",
          }}
        />
        <CustomInput
          control={control}
          name="email"
          placeholder="Email"
          rules={{
            maxLength: {
              value: 20,
              message: "Votre email ne peut excéder 20 caractères",
            },
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "L'adresse email doit être valide",
            },
            required: "Champ requis",
          }}
        />
        <CustomInput
          control={control}
          name="password"
          placeholder="Mot de passe"
          rules={{
            maxLength: {
              value: 20,
              message: "Votre mot de passe ne peut excéder 20 caractères",
            },
            minLength: {
              value: 6,
              message: "Le mot de passe doit contenir au moins 6 caractères",
            },
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
              message:
                "Le mot de passe doit contenir au moins une majuscule et un chiffre",
            },
            required: "Champ requis",
          }}
          secureTextEntry
        />
        <CustomInput
          control={control}
          name="passwordControl"
          placeholder="Confirmer le mot de passe"
          rules={{
            validate: (value) =>
              value === pwd || "Les mots de passes ne correspondent pas",
            required: "Champ requis",
          }}
          secureTextEntry
        />
        {isSubmitting && <ActivityIndicator size={"large"} />}

        <ButtonComp
          onPress={handleSubmit(onSubmit)}
          textstyl={{ fontSize: 15 }}
        >
          INSCRIPTION{" "}
        </ButtonComp>
      </View>
    </View>
  );
}
