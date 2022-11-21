import http from "../utils/http";
const BASE_URL = `http://127.0.0.1:8000/api/movie`

export const getFeaturedMovies = () => {
  return http.get(`${BASE_URL}/featured`)
}

export const MainService = {
  getFeaturedMovies
}
