import React from "react";
import s from "./Profile.module.scss"
import useFavoriteMovies from "../../app/hooks/useFavoriteMovies";
import Cards from "../../components/card/card";

const ProfileFavoritesData = () => {
  const {favorites, handleAddOrRemoveFavorites} = useFavoriteMovies()

  return (
    <div className={s.content}>
      <h2>Избранные фильмы</h2>
      {favorites.length === 0 && (
        <div className={s.empty}>
          <h3>Пока еще не добавлен ни один фильм в избранное!</h3>
        </div>
      )}
      <div className={s.favoritesData}>
        {favorites.length > 0 && favorites.map((item, index) => (
          <Cards
            onFavoritesClick={handleAddOrRemoveFavorites}
            isInFavorite={true}
            key={index}
            movie={item}
          />
        ))}
      </div>
    </div>
  )
}

export default ProfileFavoritesData
