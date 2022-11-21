import http from "../utils/http";
const BASE_URL = `http://127.0.0.1:8000/api/admin`

const createMovie = (data) => {
  return http.post(`${BASE_URL}/movie/create`, data)
}

const getMovies = () => {
  return http.get(`${BASE_URL}/movie/list`, {
    params: {
      rows: 15,
      page: 1
    }
  })
}

export const AdminService = {
  createMovie,
  getMovies
}
