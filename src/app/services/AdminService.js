import http from "../utils/http";

const BASE_URL = `http://localhost:8000/api/admin`

const createMovie = (data) => {
  return http.post(`${BASE_URL}/movie/create`, data)
}

const updateMovie = (data, movieId) => {
  return http.put(`${BASE_URL}/movie/update`, data, {
    params: {
      movie_id: movieId
    }
  })
}

const getMovies = () => {
  return http.get(`${BASE_URL}/movie/list`, {
    params: {
      rows: 15,
      page: 1
    }
  })
}

const getAllMovies = () => {
  return http.get(`${BASE_URL}/movie/all`)
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

const createGenre = (data) => {
  return http.post(`${BASE_URL}/genre/create`, data)
}

const updateGenre = (data, movieId) => {
  return http.put(`${BASE_URL}/genre/update`, data, {
    params: {
      genre_id: movieId
    }
  })
}

const getGenres = () => {
  return http.get(`${BASE_URL}/genre/list`, {
    params: {
      rows: 15,
      page: 1
    }
  })
}

const getGenre = (movieId) => {
  return http.get(`${BASE_URL}/genre`, {
    params: {
      genre_id: movieId
    }
  })
}

const deleteGenre = (movieId) => {
  return http.delete(`${BASE_URL}/genre/delete`, {
    params: {
      genre_id: movieId
    }
  })
}

const attachMovieToGenre = (data) => {
  return http.post(`${BASE_URL}/genre/toggle`, data)
}

export const AdminService = {
  createMovie,
  updateMovie,
  getMovies,
  getAllMovies,
  getMovie,
  deleteMovie,

  createGenre,
  updateGenre,
  getGenres,
  getGenre,
  deleteGenre,
  attachMovieToGenre
}
