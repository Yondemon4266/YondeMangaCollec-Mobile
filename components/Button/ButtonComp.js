import React from "react";
import { TouchableOpacity, Image, ActivityIndicator } from "react-native";
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
    isLoading,
    ...rest
  } = props;
  return (
    <TouchableOpacity
      style={[s.button, styl]}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      {image ? <Image source={image} style={imgstyl} /> : null}
      <Ionicons {...rest} />
      {isLoading && <ActivityIndicator />}
      <Txt styles={[s.buttonText, textstyl]}>{children}</Txt>
    </TouchableOpacity>
  );
}
