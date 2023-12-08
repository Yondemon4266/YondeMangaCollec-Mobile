import React from "react";
import { Controller } from "react-hook-form";
import { TextInput, View } from "react-native";
import { s } from "./CustomInputStyle";
import { color1, color6 } from "../../utils/Colors";
import Txt from "../Text/Txt";

export default function CustomInput({
  name,
  control,
  rules,
  placeholder,
  secureTextEntry,
}) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <View style={[s.container, { borderColor: error ? color1 : color6 }]}>
            <TextInput
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={secureTextEntry}
              style={[s.input]}
            />
          </View>
          {error && (
            <Txt styles={{ color: color1, alignSelf: "stretch" }}>
              {error.message || rules.required}
            </Txt>
          )}
        </>
      )}
    />
  );
}
