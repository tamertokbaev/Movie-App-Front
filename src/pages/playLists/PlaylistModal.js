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
  const [uploadedImage, setUploadedImage] = useState(null)

  const onSubmit = (data) => {
    if (playlistId) {
      PlaylistService.updatePlaylist(data, playlistId)
        .then(response => {
          Toast.displaySuccessMessage("New playlist successfully created")
        })
        .catch(err => {
          Toast.displayErrorMessage("Error during creating playlist!")
        })
    } else {
      const formData = new FormData()
      formData.append('preview_image', uploadedImage)
      formData.append('playlist_name', data.playlist_name)
      formData.append('description', data.description)
      PlaylistService.createPlaylist(formData)
        .then(response => {
          setPlaylistId(response.data.playlist.id)
          Toast.displaySuccessMessage("New playlist successfully created")
        })
        .catch(err => {
          Toast.displayErrorMessage("Error during creating playlist!")
        })
    }
  }

  useEffect(() => {
    MainService.getFeaturedMovies()
      .then(res => {
        setMovies(res.data.movies)
      })
      .catch(err => Toast.displayErrorMessage("Error during fetching movie"))
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
      .catch(err => Toast.displayErrorMessage("Error during fetching movie information"))
  }

  const toggleMovie = (movieId) => {
    PlaylistService.toggleMovieOnPlaylist(playlistId, movieId)
      .then(response => {
        Toast.displaySuccessMessage("Movie has been successfully created/deleted from playlist")
        getMovies()
      })
      .catch(err => Toast.displayErrorMessage("Failed creating/deleting playlist"))
  }

  const onFileUpload = (event) => {
    const [...image] = event.target.files
    if(image.length > 0){
      setUploadedImage(image[0])
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
    >
      <div className={s.modal}>

        <div className={s.top}>
          <h3>{playlistId ? "Updating playlist" : "Create playlist"}</h3>

          <IconButton onClick={handleClose} color="inherit" size="small">
            <Close fontSize="medium"/>
          </IconButton>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={clsx(s.form, "row")}>

          <div className="col-md-4">
            <input {...register('preview_image')} onChange={onFileUpload} id="preview_upload" accept="image/*" type="file"/>
            <label className={s.fileUpload} htmlFor="preview_upload">
              {uploadedImage && <img src={URL.createObjectURL(uploadedImage)} alt=""/>}
              {!uploadedImage && <p>Upload image of playlist</p>}
            </label>
          </div>

          <div className="col-md-8">
            <input
              {...register('playlist_name')}
              type="text"
              placeholder="Playlist name"
              className={s.input}
            />

            <textarea
              {...register('description')}
              rows={3}
              placeholder="Playlist description"
              className={s.input}
            />
          </div>

          <button
            className={s.submit}
            disabled={isSubmitting}
            type="submit">
            {playlistId ? "Update" : "Create"}
          </button>
        </form>


        {playlistId ? (
          <>
            <Divider color="#f0cdff" sx={{marginTop: "1rem"}}/>

            <div className={s.add}>
              <h3>Add movie into your playlist</h3>

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
                        Release date: {item.release_date}
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
          </>
        ) : null}

      </div>
    </Modal>
  )
}


export default PlaylistModal
