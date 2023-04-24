import React from "react";
import s from "./Profile.module.scss"
import useFavoriteMovies from "../../app/hooks/useFavoriteMovies";
import Cards from "../../components/card/card";

const ProfileFavoritesData = () => {
  const {favorites, handleAddOrRemoveFavorites} = useFavoriteMovies()

  return (
    <div className={s.content}>
      <h2>Favorite movies</h2>
      {favorites.length === 0 && (
        <div className={s.empty}>
          <h3>There are no movies saved in favorites!</h3>
        </div>
      )}
      {favorites.length > 0 && favorites.map((item, index) => (
        <Cards
          onFavoritesClick={handleAddOrRemoveFavorites}
          isInFavorite={true}
          key={index}
          movie={item}
        />
      ))}
    </div>
  )
}

export default ProfileFavoritesData
