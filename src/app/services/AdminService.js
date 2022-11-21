import http from "../utils/http";

const BASE_URL = `http://127.0.0.1:8000/api/admin`

const createMovie = (data) => {
  return http.post(`${BASE_URL}/movie/create`, data)
}

const updateMovie = (data) => {
  return http.put(`${BASE_URL}/movie/update`, data)
}

const getMovies = () => {
  return http.get(`${BASE_URL}/movie/list`, {
    params: {
      rows: 15,
      page: 1
    }
  })
}

const getMovie = (movieId) => {
  return http.get(`${BASE_URL}/movie`, {
    params: {
      movie_id: movieId
    }
  })
}

const deleteMovie = (movieId) => {
  return http.delete(`${BASE_URL}/movie/delete`, {
    params: {
      movie_id: movieId
    }
  })
}

export const AdminService = {
  createMovie,
  updateMovie,
  getMovies,
  getMovie,
  deleteMovie
}
