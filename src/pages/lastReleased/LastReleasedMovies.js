import React, {useEffect, useState} from "react";
import s from "./LastReleasedMovies.module.scss"
import Layout from "../../components/Layout/Layout";
import {Breadcrumbs, Link, Typography} from "@mui/material";
import {MainService} from "../../app/services/MainService";
import Card from "../../components/card/card";
import useFavoriteMovies from "../../app/hooks/useFavoriteMovies";

const LastReleasedMovies = () => {
  const [movies, setMovies] = useState([])
  const {favorites, checkIsMovieInFavorite, handleAddOrRemoveFavorites} = useFavoriteMovies()

  useEffect(() => {
    MainService
      .getLastReleasedMovies()
      .then(response => {
        if (response.data.message === "success") {
          setMovies(response.data.movies)
        }
      })
  }, [])

  return (
    <Layout>
      <div className={s.root}>
        <Breadcrumbs sx={{paddingTop: "2rem", color: "rgb(223, 223, 223)"}} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Домой
          </Link>
          <Typography sx={{color: "rgb(223, 223, 223)"}} color="text.primary">Новинки современного кино</Typography>
        </Breadcrumbs>

        <h2 className={s.heading}>Новинки современного кино</h2>

        <div className={s.results}>
          {movies?.map((item, index) => (
            <Card
              isInFavorite={checkIsMovieInFavorite(item.id)}
              onFavoritesClick={handleAddOrRemoveFavorites}
              key={item.id}
              movie={item}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default LastReleasedMovies
