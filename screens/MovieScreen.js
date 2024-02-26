import { useNavigation, useRoute } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid"
import { styles } from "../theme"
import { LinearGradient } from "expo-linear-gradient"
import Cast from "../components/Cast"
import MovieList from "../components/MovieList"
import Loading from "../components/Loading"
import {
  fallbackMoviePoster,
  fetchCastDetails,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/movieDb"

let { width, height } = Dimensions.get("window")
const ios = Platform.OS == "ios"
const topMargin = ios ? "" : "mt-3"
const MovieScreen = () => {
  const { params: item } = useRoute()
  const navigation = useNavigation()
  const [isFav, setIsFav] = useState(false)
  const [cast, setCast] = useState(["Tom Holland", "Zendaya"])
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3])
  const [loading, setLoading] = useState(false)
  const [movie, setMovie] = useState({})

  useEffect(() => {
    // call api to fetch movie details
    setLoading(true)
    getMovieDetails(item.id)
    getMovieCredits(item.id)
    getSimilarMovies(item.id)
  }, [item])

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id)
    if (data) setMovie(data)
    setLoading(false)
  }
  const getMovieCredits = async (id) => {
    const data = await fetchCastDetails(id)
    if (data?.cast) setCast(data.cast)
  }

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id)
    if (data?.results) setSimilarMovies(data.results)
  }
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button */}
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-[95%] mx-auto flex-row justify-between items-center" +
            topMargin
          }
        >
          <TouchableOpacity
            style={styles.background}
            className="rounded-xl p-1"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFav(!isFav)}>
            <HeartIcon color={isFav ? "red" : "white"} size={35} />
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{
                uri: image500(movie.poster_path) || fallbackMoviePoster,
              }}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>

      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* movie title */}
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movie.title}
        </Text>

        {/* movie details */}
        {movie?.id ? (
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {movie?.status} · {movie?.release_date?.split("-")[0]} ·{" "}
            {movie?.runtime} min
          </Text>
        ) : null}

        {/* genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.map((genre, i) => {
            let showDot = i + 1 !== movie.genres.length
            return (
              <Text
                key={i}
                className="text-neutral-400 font-semibold text-base text-center"
              >
                {genre.name} {showDot ? "·" : null}
              </Text>
            )
          })}
        </View>

        {/* description */}

        <Text className="text-neutral-400 mx-4 tracking-wide">
          {movie?.overview}
        </Text>
      </View>

      {/* cast */}
      {cast?.length > 0 && !loading && (
        <Cast cast={cast} navigation={navigation} />
      )}

      {/* Similar movies */}
      {similarMovies?.length > 0 && !loading && (
        <MovieList
          title="Similar Movies"
          data={similarMovies}
          hideSeeAll={true}
        />
      )}
    </ScrollView>
  )
}
export default MovieScreen
