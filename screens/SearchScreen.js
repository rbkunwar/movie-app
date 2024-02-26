import { useNavigation } from "@react-navigation/native"
import React, { useCallback, useState } from "react"
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import { XMarkIcon } from "react-native-heroicons/outline"
import Loading from "../components/Loading"
import { fallbackMoviePoster, image342, searchMovies } from "../api/movieDb"
import { debounce } from "lodash"

let { width, height } = Dimensions.get("window")
const SearchScreen = () => {
  const navigation = useNavigation()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const movieName = "Spider-man: Into the spider-verse"

  const handleSearch = (value) => {
    if (value?.length > 2) {
      setLoading(true)
      searchMovies({
        query: value,
        include_adult: "true",
        language: "en-US",
        page: 1,
      }).then((data) => {
        setLoading(false)
        if (data?.results) setResults(data.results)
      })
    } else {
      setLoading(false)
      setResults([])
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          className="pb-1.5 pl-4 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size={25} color={"white"} />
        </TouchableOpacity>
      </View>

      {/* results */}

      {loading ? (
        <Loading />
      ) : results?.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({results.length})
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {results.map((item, i) => (
              <TouchableWithoutFeedback
                key={i}
                onPress={() => navigation.push("Movie", item)}
              >
                <View className="space-y-2 mb-4">
                  <Image
                    className="rounded-3xl"
                    source={{
                      uri: image342(item?.poster_path) || fallbackMoviePoster,
                    }}
                    style={{ width: width * 0.44, height: height * 0.3 }}
                  />
                  <Text className="text-neutral-300 ml-1">
                    {item?.title?.length > 22
                      ? item?.title.slice(0, 22) + "..."
                      : item?.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/movieTime.png")}
            className="w-96 h-96"
          />
        </View>
      )}
    </SafeAreaView>
  )
}
export default SearchScreen
