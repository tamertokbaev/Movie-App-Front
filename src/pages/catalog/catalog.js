import React, {useEffect, useState} from "react";
import Layout from "../../components/Layout/Layout";
import s from "./Catalog.module.scss"
import useMediaQuery from "../../app/hooks/useMediaQuery";
import {Breadcrumbs, Link, Typography} from "@mui/material";
import {MainService} from "../../app/services/MainService";
import Card from "../../components/card/card";
import clsx from "clsx";

const Catalog = () => {
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [activeGenre, setActiveGenre] = useState()
  const isBiggerThanTablet = useMediaQuery("(min-width: 768px)")

  useEffect(() => {
    MainService
      .getGenres()
      .then(response => {
        setGenres(response.data.genres)
        getMoviesByGenre(response.data.genres[0].id)
        setActiveGenre(response.data.genres[0].id)
      })
  }, [])

  const getMoviesByGenre = (genreId) => {
    MainService.getMoviesByGenre(genreId)
      .then(response => {
        setMovies(response.data.movies)
      })
  }

  return (
    <Layout disableHeader={!isBiggerThanTablet}>
      <div className={s.root}>
        <Breadcrumbs sx={{paddingTop: "2rem", color: "rgb(223, 223, 223)"}} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography sx={{color: "rgb(223, 223, 223)"}} color="text.primary">Catalog</Typography>
        </Breadcrumbs>
        <h1 className={s.heading}>Catalog</h1>

        <div className={s.genres}>
          {genres.map((item, index) => (
            <div onClick={() => {
              setActiveGenre(item.id)
              getMoviesByGenre(item.id)
            }} className={clsx(s.genre, {[s.active]: activeGenre === item.id})} key={index}>
              {item.genre_name}
            </div>
          ))}
        </div>

        {movies.map((item, index) => (
          <Card
            key={index}
            movie={item}
          />
        ))}
      </div>
    </Layout>
  )
}

export default Catalog
