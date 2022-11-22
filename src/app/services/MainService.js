import http from "../utils/http";
const BASE_URL = `http://127.0.0.1:8000/api/movie`

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
