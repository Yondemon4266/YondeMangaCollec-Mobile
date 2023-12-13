import React from "react";
import { Image, View, Text, ImageBackground, Button } from "react-native";
import zoro from "../../assets/images/specialcards/zoro/zoro.png";
import zorobg from "../../assets/images/specialcards/zoro/zorobg.jpg";
import { s } from "./CatalogueSpecialCardStyle";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function CatalogueSpecialCard() {
  const translateX = useSharedValue(150);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(translateX.value - 400) }],
  }));
  const handlePress = () => {
    translateX.value += 50;
  };

  return (
    <>
      <Animated.View
        style={[
          {
            height: 100,
            backgroundColor: "violet",
          },
          animatedStyles,
        ]}
      />
      <View>
        <Text>Kyojuro Rengoku</Text>
      </View>
      <Button onPress={handlePress} title="Click me" />
    </>
  );
}
