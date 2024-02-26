import { StatusBar } from "expo-status-bar"
import React, { useEffect, useState } from "react"
import {
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline"
import { styles } from "../theme"
import TrendingMovies from "../components/TrendingMovies"
import MovieList from "../components/MovieList"
import { useNavigation } from "@react-navigation/native"
import Loading from "../components/Loading"
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/movieDb"

const ios = Platform.OS == "ios"

const HomeScreen = () => {
  const navigation = useNavigation()
  const [trending, setTrending] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [topRated, setTopRated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTrendingMovies()
    getUpcomingMovies()
    getTopRatedMovies()
  }, [])

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies()
    if (data?.results) setTrending(data.results)
    setLoading(false)
  }
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies()
    if (data?.results) setUpcoming(data.results)
    setLoading(false)
  }
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies()
    if (data?.results) setTopRated(data.results)
    setLoading(false)
  }
  return (
    <View className="flex-1 bg-neutral-900">
      {/* search bar and logo */}

      <SafeAreaView className={ios ? "" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color={"white"} />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color={"white"} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* trending movies carousel */}
          {trending.length > 0 && <TrendingMovies data={trending} />}

          {/* upcoming movies row */}
          {upcoming.length > 0 && (
            <MovieList title="Upcoming" data={upcoming} />
          )}

          {/* top rated movies */}
          {topRated.length > 0 && (
            <MovieList title={"Top Rated"} data={topRated} />
          )}
        </ScrollView>
      )}
    </View>
  )
}
export default HomeScreen
