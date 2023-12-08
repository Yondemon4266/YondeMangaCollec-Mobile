import React from "react";
import { Text } from "react-native";
import { s } from "./TxtStyle";

export default function Txt({ children, styles }) {
  return <Text style={[s.textM, styles]}>{children}</Text>;
}
