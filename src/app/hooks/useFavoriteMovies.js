import React, {useEffect, useState} from "react";
import {MainService} from "../services/MainService";

const useFavoriteMovies = () => {
  const [favorites, setFavorites] = useState([])

  const checkIsMovieInFavorite = (movieId) => {
    return !!favorites.find(item => item.id === movieId)
  }

  const handleAddOrRemoveFavorites = (movieId) => {
    MainService
      .addOrRemoveFavorites(movieId)
      .then(response => {
        if (response.data.message === "success") {
          setFavorites(response.data.favorites)
        }
      })
  }

  useEffect(() => {
    MainService
      .getFavoriteMovies()
      .then(res => {
        if (res.data.message === "success") {
          setFavorites(res.data.favorites)
        }
      })
  }, [])

  return {favorites, setFavorites, checkIsMovieInFavorite, handleAddOrRemoveFavorites}
}

export default useFavoriteMovies
