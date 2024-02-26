import React from "react"
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import { styles } from "../theme"
import { useNavigation } from "@react-navigation/native"
import { fallbackMoviePoster, image185 } from "../api/movieDb"

let { width, height } = Dimensions.get("window")

const MovieList = ({ title, data, hideSeeAll }) => {
  const navigation = useNavigation()

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* List of movies */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, i) => (
          <TouchableWithoutFeedback
            key={i}
            onPress={() => navigation.push("Movie", item)}
          >
            <View className="mr-4">
              <Image
                source={{
                  uri: image185(item?.poster_path) || fallbackMoviePoster,
                }}
                className="rounded-3xl"
                style={{ width: width * 0.33, height: height * 0.22 }}
              />
              <Text className="text-neutral-300 ml-1">
                {item?.title?.length > 14
                  ? item?.title.slice(0, 14) + "..."
                  : item?.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  )
}
export default MovieList
