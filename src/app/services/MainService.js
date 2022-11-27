import http from "../utils/http";
const BASE_URL = `http://localhost:8000/api/movie`

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

const getFavoriteMovies = () => {
  return http.get(`${BASE_URL}/favorites`)
}

const addOrRemoveFavorites = (movieId) => {
  return http.post(`${BASE_URL}/favorites`, {
    movie_id: movieId
  })
}

const search = (slug) => {
  return http.get(`${BASE_URL}/search`, {
    params: {
      slug: slug
    }
  })
}

export const MainService = {
  getFeaturedMovies,
  getPopularMovies,
  getMovieInfo,
  getFavoriteMovies,
  addOrRemoveFavorites,
  search
}
