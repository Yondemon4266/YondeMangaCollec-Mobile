import { View } from "react-native";
import Txt from "../../components/Text/Txt";
import { s } from "./Style";
import { useForm } from "react-hook-form";
import ButtonComp from "../../components/Button/ButtonComp";
import CustomInput from "../../components/CustomInput/CustomInput";
export default function Connexion() {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <View style={s.container}>
      <Txt styles={s.title}>Connexion</Txt>
      <View style={s.content}>
        <CustomInput
          control={control}
          name="mail"
          rules={{
            required: "Champ requis",
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
      </View>
    </View>
  );
}
