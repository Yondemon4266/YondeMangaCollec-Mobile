import { ScrollView, View } from "react-native";

import { s } from "./CardScreenStyle";
import CardScreenHeader from "../../components/CardScreen/CardScreenHeader";
import Txt from "../../components/Text/Txt";
import Tag from "../../components/Tags/Tag";
import { color5, colorManga, color1 } from "../../utils/Colors";
import Stars from "../../components/stars/Stars";
import ButtonComp from "../../components/Button/ButtonComp";
export default function CardScreen({ route, navigation }) {
  const { data } = route.params;
  return (
    <View style={s.container}>
      <ScrollView nestedScrollEnabled={true}>
        <View style={s.sousContainer}>
          <CardScreenHeader
            img={data.images.jpg.image_url}
            bigImg={data.images.jpg.large_image_url}
            navigation={navigation}
          />
          <Txt styles={s.title}>{data.title}</Txt>
          <Txt styles={s.title2}>{data.title_english}</Txt>
          <View style={s.tagsContainer}>
            {data.genres &&
              data.genres.map((element) => {
                return <Tag key={element.mal_id}>{element.name}</Tag>;
              })}
            <Tag
              v={
                data.type === "TV"
                  ? { backgroundColor: color1 }
                  : { backgroundColor: colorManga }
              }
              t={{ color: color5 }}
            >
              {data.type}
            </Tag>
          </View>
          <Stars data={data} />

          <View style={s.synopsis}>
            <ScrollView nestedScrollEnabled={true}>
              <Txt>{data.synopsis}</Txt>
            </ScrollView>
          </View>
          <View style={{ paddingHorizontal: 30 }}>
            <ButtonComp
              onPress={() => navigation.navigate("CompteStack")}
              name="add"
              size={24}
              color={color5}
              styl={{ alignSelf: "flex-start" }}
            >
              Se connecter
            </ButtonComp>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
