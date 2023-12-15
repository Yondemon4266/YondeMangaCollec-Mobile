import { ActivityIndicator, View } from "react-native";
import Txt from "../../components/Text/Txt";
import { s } from "./Style";
import { useForm } from "react-hook-form";
import ButtonComp from "../../components/Button/ButtonComp";
import CustomInput from "../../components/CustomInput/CustomInput";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authReducer } from "../../Redux/UserSlice";
export default function Connexion({ navigation }) {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios({
        method: "post",
        url: `https://server-yondemangacollec.onrender.com/api/user/login`,
        data: {
          email: data.email,
          password: data.password,
        },
      });
      if (response) {
        console.log("login réussi");
        navigation.navigate("ConnexionReussi");
      } else {
        dispatch(authReducer(false));
      }
    } catch (err) {
      dispatch(authReducer(false));
      const asyncErrors = err.response.data.errors;
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
  return (
    <View style={s.container}>
      <Txt styles={s.title}>Connexion</Txt>
      <View style={s.content}>
        <CustomInput
          control={control}
          name="email"
          rules={{
            required: "Champ requis",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "L'adresse email doit être valide",
            },
          }}
          placeholder="Email"
        />
        <CustomInput
          control={control}
          name="password"
          rules={{
            required: "Champ requis",
            minLength: {
              value: 8,
              message: "Le mot de passe doit contenir au moins 8 caractères",
            },
          }}
          placeholder="Mot de passe"
          secureTextEntry
        />

        <ButtonComp
          onPress={handleSubmit(onSubmit)}
          textstyl={{ fontSize: 15 }}
        >
          SE CONNECTER{" "}
        </ButtonComp>
        {isSubmitting && <ActivityIndicator size={"large"} />}
      </View>
    </View>
  );
}
