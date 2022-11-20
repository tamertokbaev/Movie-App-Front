import http from "../utils/http";
const BASE_URL = `http://127.0.0.1:8000/api/admin`

export const createMovie = (data) => {
  return http.post(`${BASE_URL}/movie/create`, data)
}

export const AdminService = {
  createMovie
}
