import React from "react";
import { TouchableOpacity, Image } from "react-native";
import Txt from "../Text/Txt";
import { s } from "./ButtonCompStyle";
import { Ionicons } from "@expo/vector-icons";
export default function ButtonComp(props) {
  const {
    children,
    styl,
    textstyl,
    onPress,
    disabled,
    image,
    imgstyl,
    ...rest
  } = props;
  return (
    <TouchableOpacity
      style={[s.button, styl]}
      onPress={onPress}
      disabled={disabled}
    >
      {image ? <Image source={image} style={imgstyl} /> : null}
      <Ionicons {...rest} />
      <Txt styles={[s.buttonText, textstyl]}>{children}</Txt>
    </TouchableOpacity>
  );
}
