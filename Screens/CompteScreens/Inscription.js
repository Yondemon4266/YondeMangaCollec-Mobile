import { View, Text } from "react-native";
import { s } from "./Style";
import { useForm } from "react-hook-form";
import Txt from "../../components/Text/Txt";
import CustomInput from "../../components/CustomInput/CustomInput";
import ButtonComp from "../../components/Button/ButtonComp";

export default function Inscription() {
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("password");
  const onSubmit = (data) => console.log(data);
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
          name="mail"
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
              value: 8,
              message: "Le mot de passe doit contenir au moins 8 caractères",
            },
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
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
