import React, {useEffect, useState} from "react";
import {Button, Divider, IconButton, Modal, Rating} from "@mui/material";
import s from "./Playlists.module.scss"
import {Close} from "@mui/icons-material";
import clsx from "clsx";
import {useForm} from "react-hook-form";
import {Toast} from "../../app/utils/toast";
import {PlaylistService} from "../../app/services/PlaylistService";
import {MainService} from "../../app/services/MainService";

const PlaylistModal = ({isOpen, handleClose}) => {
  const {formState, handleSubmit, register} = useForm({
    mode: "onSubmit"
  })
  const {errors, isSubmitting} = formState
  const [movies, setMovies] = useState([])
  const [addedMovies, setAddedMovies] = useState([])
  const [playlistId, setPlaylistId] = useState()

  const onSubmit = (data) => {
    if (playlistId) {
      PlaylistService.updatePlaylist(data, playlistId)
        .then(response => {
          Toast.displaySuccessMessage("Новый плейлист успешно создан")
        })
        .catch(err => {
          Toast.displayErrorMessage("Произошла ошибка при создании плейлиста!")
        })
    } else {
      PlaylistService.createPlaylist(data)
        .then(response => {
          setPlaylistId(response.data.playlist.id)
          Toast.displaySuccessMessage("Новый плейлист успешно создан")
        })
        .catch(err => {
          Toast.displayErrorMessage("Произошла ошибка при создании плейлиста!")
        })
    }
  }

  useEffect(() => {
    MainService.getFeaturedMovies()
      .then(res => {
        setMovies(res.data.movies)
      })
      .catch(err => Toast.displayErrorMessage("Произошла ошибка при выводе фильмов"))
  }, [])

  useEffect(() => {
    if (playlistId) {
      getMovies()
    }
  }, [playlistId])

  const getMovies = () => {
    PlaylistService
      .getAddedMoviesInPlaylist(playlistId)
      .then(response => {
        setAddedMovies(response.data.movies)
      })
      .catch(err => Toast.displayErrorMessage("Произошла ошибка при получении фильмов"))
  }

  const toggleMovie = (movieId) => {
    PlaylistService.toggleMovieOnPlaylist(playlistId, movieId)
      .then(response => {
        Toast.displaySuccessMessage("Фильм был успешно добавлен/удален из плейлиста")
        getMovies()
      })
      .catch(err => Toast.displayErrorMessage("Не удалось добавить/удалить фильм в плейлист"))
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
    >
      <div className={s.modal}>

        <div className={s.top}>
          <h3>{playlistId ? "Изменить плейлист" : "Создать плейлист"}</h3>

          <IconButton onClick={handleClose} color="inherit" size="small">
            <Close fontSize="medium"/>
          </IconButton>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={clsx(s.form, "row")}>

          <div className="col-md-6">

          </div>

          <div className="col-md-6">
            <input
              {...register('playlist_name')}
              type="text"
              placeholder="Название плейлиста"
              className={s.input}
            />

            <textarea
              {...register('description')}
              rows={3}
              placeholder="Описание плейлиста"
              className={s.input}
            />
          </div>

          <button
            className={s.submit}
            disabled={isSubmitting}
            type="submit">
            {playlistId ? "Изменить" : "Создать"}
          </button>
        </form>


        {playlistId ? (
          <>
            <Divider color="#f0cdff" sx={{marginTop: "1rem"}}/>

            <div className={s.add}>
              <h3>Добавьте фильмы к вашему плейлисту</h3>

              <div className={s.movies}>

                {movies.map((item, index) => (
                  <div className={s.movie}>

                    <div
                      className={s.img}
                    >
                      <img
                        src={item.image_url}
                        alt=""
                      />
                    </div>


                    <div className={s.content}>
                      <h4 className={s.name}>{item.title}</h4>
                      <div className={s.rating}>
                        Рейтинг: <Rating
                        readOnly
                        size="small"
                        value={item.rating}
                        defaultValue={item.rating}
                        precision={0.1}
                        max={10}
                      />
                      </div>
                      <div className={s.releaseDate}>
                        Дата выпуска: {item.release_date}
                      </div>

                      <Button
                        onClick={() => toggleMovie(item.id)}
                        color={addedMovies.find(added => added.id === item.id) ? "error" : "warning"}
                        size="small"
                        sx={{
                          fontSize: "10px"
                        }}
                      >
                        {addedMovies.find(added => added.id === item.id) ? "Удалить" : "Добавить"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </>
        ) : null}

      </div>
    </Modal>
  )
}


export default PlaylistModal
