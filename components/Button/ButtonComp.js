import React from "react";
import { TouchableOpacity } from "react-native";
import Txt from "../Text/Txt";
import { s } from "./ButtonCompStyle";
import { Ionicons } from "@expo/vector-icons";
export default function ButtonComp(props) {
  const { children, styl, textstyl, onPress, disabled, ...rest } = props;
  return (
    <TouchableOpacity
      style={[s.button, styl]}
      onPress={onPress}
      disabled={disabled}
    >
      <Ionicons {...rest} />
      <Txt styles={[s.buttonText, textstyl]}>{children}</Txt>
    </TouchableOpacity>
  );
}
