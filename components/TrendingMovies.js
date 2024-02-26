import React from "react"
import { Dimensions, Text, View } from "react-native"
import Carousel from "react-native-snap-carousel"
import MovieCard from "./MovieCard"
import { useNavigation } from "@react-navigation/native"

let { width } = Dimensions.get("window")
const TrendingMovies = ({ data }) => {
  const navigation = useNavigation()
  const handleClick = (item) => {
    navigation.navigate("Movie", item)
  }
  const renderItem = ({ item }) => (
    <MovieCard item={item} handleClick={handleClick} />
  )

  return (
    <View className="my-8">
      <Text className="text-white text-xl mx-4 mb-5"></Text>
      <Carousel
        data={data}
        renderItem={renderItem}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  )
}
export default TrendingMovies
