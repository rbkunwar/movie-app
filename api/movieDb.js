import axios from "axios"
import { TMDB_API_KEY } from "@env"

// endpoints
const apiBaseUrl = "https://api.themoviedb.org/3"
const trendingMovieEP = `${apiBaseUrl}/trending/movie/day?api_key=${TMDB_API_KEY}`
const upcomingMoviesEP = `${apiBaseUrl}/movie/upcoming?api_key=${TMDB_API_KEY}`
const topRatedMoviesEP = `${apiBaseUrl}/movie/top_rated?api_key=${TMDB_API_KEY}`

// dynamic endpoints
const movieDetailsEP = (id) =>
  `${apiBaseUrl}/movie/${id}?api_key=${TMDB_API_KEY}`
const castEP = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${TMDB_API_KEY}`
const similarMoviesEP = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${TMDB_API_KEY}`
const personDetailsEP = (id) =>
  `${apiBaseUrl}/person/${id}?api_key=${TMDB_API_KEY}`
const personMoviesEP = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${TMDB_API_KEY}`
const searchMoviesEP = `${apiBaseUrl}/search/movie?api_key=${TMDB_API_KEY}`

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : null
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342/${path}` : null
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185/${path}` : null

// fallback images
export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg"

export const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU"

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  }

  try {
    const { data } = await axios.request(options)

    return data
  } catch (error) {
    console.log(error)
  }
}

// home screen apis
export const fetchTrendingMovies = () => {
  return apiCall(trendingMovieEP)
}
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEP)
}
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEP)
}

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEP(id))
}
export const fetchCastDetails = (id) => {
  return apiCall(castEP(id))
}
export const fetchSimilarMovies = (id) => {
  return apiCall(similarMoviesEP(id))
}

export const fetchPersonDetails = (id) => {
  return apiCall(personDetailsEP(id))
}
export const fetchPersonMovies = (id) => {
  return apiCall(personMoviesEP(id))
}

export const searchMovies = (params) => {
  return apiCall(searchMoviesEP, params)
}
