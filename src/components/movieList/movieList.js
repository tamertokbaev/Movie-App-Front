import React, {useEffect, useState} from "react"
import "./movieList.css"
import Cards from "../card/card"
import {MainService} from "../../app/services/MainService";
import {Toast} from "../../app/utils/toast";
import useFavoriteMovies from "../../app/hooks/useFavoriteMovies";

const MovieList = () => {
  const [movieList, setMovieList] = useState([])
  const {favorites, setFavorites, checkIsMovieInFavorite} = useFavoriteMovies()

  useEffect(() => {
    getData()
  }, [])


  const getData = () => {
    MainService
      .getPopularMovies()
      .then(response => {
        if (response.data.message === "success") {
          setMovieList(response.data.movies)
        }
      })
      .catch(err => {
        Toast.displayErrorMessage("Не удалось получить список фильмов!")
      })
  }

  return (
    <div className="movie__list">
      <h2 className="list__title">Популярные фильмы</h2>
      <div className="list__cards">
        {
          movieList.map(movie => (
            <Cards
              isInFavorite={checkIsMovieInFavorite(movie.id)}
              key={movie.id}
              movie={movie}
            />
          ))
        }
      </div>
    </div>
  )
}

export default MovieList
