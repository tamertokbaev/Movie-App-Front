import React, {useEffect, useState} from "react";
import {MainService} from "../services/MainService";

const useFavoriteMovies = () => {
  const [favorites, setFavorites] = useState([])

  const checkIsMovieInFavorite = (movieId) => {
    return !!favorites.find(item => item.id === movieId)
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

  return {favorites, setFavorites, checkIsMovieInFavorite}
}

export default useFavoriteMovies
