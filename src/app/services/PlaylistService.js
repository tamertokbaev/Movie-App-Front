import http from "../utils/http";
const BASE_URL = `http://localhost:8000/api/playlists`


const getListOfPlaylists = () => {
  return http.get(`${BASE_URL}`)
}

const createPlaylist = (data) => {
  return http.post(`${BASE_URL}`, data)
}

const updatePlaylist = (data, playlistId) => {
  return http.put(`${BASE_URL}`, data, {
    params: {
      playlist_id: playlistId
    }
  })
}

const deletePlaylist = (playlistId) => {
  return http.delete(`${BASE_URL}`, {
    params: {
      playlist_id: playlistId
    }
  })
}

const toggleMovieOnPlaylist = (playlistId, movieId) => {
  return http.post(`${BASE_URL}/toggle-movie`, {playlist_id: playlistId, movie_id: movieId}, {
    params: {playlistId, movieId}
  })
}

const getAddedMoviesInPlaylist = (playlistId) => {
  return http.get(`${BASE_URL}/get-movies`, {
    params: {
      playlist_id: playlistId
    }
  })
}

export const PlaylistService = {
  getListOfPlaylists,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  toggleMovieOnPlaylist,
  getAddedMoviesInPlaylist
}
