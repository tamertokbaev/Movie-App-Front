import React, {useEffect, useState} from "react";
import {Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import FormGroup from "../../../components/Form/FormGroup";
import FormHelperMessage from "../../../components/Form/FormHelperMessage";
import {AdminService} from "../../../app/services/AdminService";
import {AddOutlined, Delete} from "@mui/icons-material";
import {Toast} from "../../../app/utils/toast";
import s from "./AdminGenresList.module.scss"

const AttachMovie = ({isOpen, handleClose, genre, fetchInfoAgain}) => {
  const {formState, handleSubmit, control} = useForm({
    mode: "onSubmit"
  })
  const {errors, isSubmitting} = formState
  const [movies, setMovies] = useState([])
  const [attachedMovies, setAttachedMovies] = useState(genre ? genre.movies : [])

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = () => {
    AdminService.getAllMovies()
      .then(res => {
        setMovies(res.data.movies)
      })
  }

  const onSubmit = async (data) => {
    AdminService.attachMovieToGenre({...data, genre_id: genre.id})
      .then(response => {
        setAttachedMovies(response.data.movies)
        fetchInfoAgain()
      })
      .catch(err => {
        Toast.displayErrorMessage("Произошла ошибка при добавлении фильма к жанру!")
      })
  }

  const deAttachMovie = (movieId) => {
    AdminService.attachMovieToGenre({movie_id: movieId, genre_id: genre.id})
      .then(response => {
        console.log(response.data)
        setAttachedMovies(response.data.movies)
        fetchInfoAgain()
      })
      .catch(err => {
        Toast.displayErrorMessage("Произошла ошибка при добавлении фильма к жанру!")
      })
  }

  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
    >
      <DialogTitle sx={{fontWeight: "400"}}>
        Прикрепить фильм к жанру {genre?.genre_name}
      </DialogTitle>
      <DialogContent>
        <form style={{marginTop: "1rem"}} onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Controller
              control={control}
              name="movie_id"
              render={({field: {onChange, value}}) => (
                <Autocomplete
                  value={value}
                  onChange={(_, data) => onChange(data.id)}
                  options={movies}
                  getOptionLabel={option => option.title}
                  noOptionsText="Нет подходящих фильмов"
                  renderInput={(params) => <TextField {...params} name="movie_id" label="Выберите фильм" />}
                />
              )}
            />
            <FormHelperMessage>{errors.movie_id?.message}</FormHelperMessage>
          </FormGroup>
          <FormGroup>
            <Button
              startIcon={<AddOutlined/>}
              variant="contained"
              type="submit"
            >
              Добавить
            </Button>
          </FormGroup>
        </form>
        <div>
          {attachedMovies.length === 0 && (
            <div className={s.emptyAttached}>
              К данному жанру пока не прикреплен ни один фильм!
            </div>
          )}
          {attachedMovies.length > 0 && (
            <div className={s.attachedMovies}>
              {attachedMovies.map((item, index) => (
                <div className={s.item} key={index}>
                  {item.title}
                  <Button
                    onClick={() => deAttachMovie(item.id)}
                    startIcon={<Delete/>}
                    color="error"
                  >
                    Удалить
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          onClick={handleClose}>
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AttachMovie
