import React, {useEffect, useState} from "react";
import Layout from "../../components/Layout/Layout";
import useFavoriteMovies from "../../app/hooks/useFavoriteMovies";
import {useSearchParams} from "react-router-dom";
import {MainService} from "../../app/services/MainService";
import s from "./Search.module.scss"
import Cards from "../../components/card/card";
import {Breadcrumbs, Link, Typography} from "@mui/material";

const Search = () => {
  const {favorites, checkIsMovieInFavorite, handleAddOrRemoveFavorites} = useFavoriteMovies()
  const [searchParams, setSearchParams] = useSearchParams()
  const [movieList, setMovieList] = useState([])

  useEffect(() => {
    makeSearch()
  }, [searchParams])

  const makeSearch = () => {
    const searchSlug = searchParams.get('slug')
    if (searchSlug) {
      MainService
        .search(searchSlug)
        .then(response => {
          if (response.data.message === "success") {
            setMovieList(response.data.results)
          }
        })
    }
  }

  return (
    <Layout>
      <div className={s.root}>
        <Breadcrumbs sx={{paddingTop: "2rem", color: "rgb(223, 223, 223)"}} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Домой
          </Link>
          <Typography sx={{color: "rgb(223, 223, 223)"}} color="text.primary">Поиск по ключевому слову "{searchParams.get('slug')}"</Typography>
        </Breadcrumbs>

        <h2 className={s.heading}>Результаты поиска по запросу {searchParams.get('slug')}</h2>

        <div className={s.results}>
          {movieList.length > 0 &&
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

        {movieList.length === 0 && (
          <div className={s.empty}>
            <p>По вашему запросу ничего не найдено</p>
            <img src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png" alt=""/>
          </div>
        )}
      </div>
    </Layout>
  )
}

export {Search}
