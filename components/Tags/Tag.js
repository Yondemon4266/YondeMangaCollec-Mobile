import React from "react";

import { s } from "./TagStyle";
import Txt from "../Text/Txt";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Tag({ children, v, t, name, size, color, ...rest }) {
  return (
    <TouchableOpacity style={[s.tagC, v]} {...rest}>
      {name && <Ionicons name={name} size={size} color={color} />}
      <Txt styles={[s.tagText, t]}>{children}</Txt>
    </TouchableOpacity>
  );
}
