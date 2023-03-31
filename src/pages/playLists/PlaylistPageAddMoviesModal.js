import React, {useEffect, useState} from "react";
import {Button, Divider, IconButton, Modal, Rating} from "@mui/material";
import s from "./Playlists.module.scss"
import {Close} from "@mui/icons-material";
import {PlaylistService} from "../../app/services/PlaylistService";
import {Toast} from "../../app/utils/toast";
import {MainService} from "../../app/services/MainService";

const PlaylistPageAddMoviesModal = ({isOpen, handleClose, playlistId}) => {
  const [movies, setMovies] = useState([])
  const [addedMovies, setAddedMovies] = useState([])

  useEffect(() => {
    getMovies()
  }, [playlistId])

  useEffect(() => {
    MainService.getFeaturedMovies()
      .then(res => {
        setMovies(res.data.movies)
      })
      .catch(err => Toast.displayErrorMessage("Error during fetching information about movie"))
  }, [])

  const getMovies = () => {
    PlaylistService
      .getAddedMoviesInPlaylist(playlistId)
      .then(response => {
        setAddedMovies(response.data.movies)
      })
      .catch(err => Toast.displayErrorMessage("Error during fetching movie"))
  }

  const toggleMovie = (movieId) => {
    PlaylistService.toggleMovieOnPlaylist(playlistId, movieId)
      .then(response => {
        Toast.displaySuccessMessage("Movie has been added/removed from playlist")
        getMovies()
      })
      .catch(err => Toast.displayErrorMessage("Error during adding/removing movie from playlist"))
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
    >
      <div className={s.modal}>

        <div className={s.top}>
          <h3>Add movie in playlist</h3>

          <IconButton onClick={handleClose} color="inherit" size="small">
            <Close fontSize="medium"/>
          </IconButton>
        </div>
        <div className={s.add}>
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
                    {addedMovies.find(added => added.id === item.id) ? "Remove" : "Add"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default PlaylistPageAddMoviesModal
