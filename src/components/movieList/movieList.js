import React, {useEffect, useState} from "react"
import "./movieList.scss"
import Cards from "../card/card"
import {MainService} from "../../app/services/MainService";
import {Toast} from "../../app/utils/toast";
import useFavoriteMovies from "../../app/hooks/useFavoriteMovies";

const MovieList = () => {
  const [movieList, setMovieList] = useState([])
  const {favorites, setFavorites, checkIsMovieInFavorite, handleAddOrRemoveFavorites} = useFavoriteMovies()

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
        Toast.displayErrorMessage("Error during fetching movies!")
      })
  }

  return (
    <div className="movie__list">
      <h2 className="list__title">Popular movies</h2>
      <div className="list__cards">
        {
          movieList.map(movie => (
            <Cards
              isInFavorite={checkIsMovieInFavorite(movie.id)}
              onFavoritesClick={handleAddOrRemoveFavorites}
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
