import http from "../utils/http";
const BASE_URL = `http://138.68.67.253/api/movie`

const getFeaturedMovies = () => {
  return http.get(`${BASE_URL}/featured`)
}

const getPopularMovies = () => {
  return http.get(`${BASE_URL}/popular`)
}

const getMovieInfo = (movieId) => {
  return http.get(`${BASE_URL}/info`, {
    params: {
      movie_id: movieId
    }
  })
}

export const MainService = {
  getFeaturedMovies,
  getPopularMovies,
  getMovieInfo
}
