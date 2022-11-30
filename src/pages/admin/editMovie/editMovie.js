import React, {useEffect, useState} from "react";
import Layout from "../../../components/Layout/Layout";
import s from './EditMovie.module.scss'
import {Controller, useForm} from "react-hook-form";
import {Button, Grid, TextField} from "@mui/material";
import FormHelperMessage from "../../../components/Form/FormHelperMessage";
import FormGroup from "../../../components/Form/FormGroup";
import AddIcon from '@mui/icons-material/Add';
import {AdminService} from "../../../app/services/AdminService";
import {Toast} from "../../../app/utils/toast";
import {useParams} from "react-router-dom";
import {Edit} from "@mui/icons-material";

const EditMovie = () => {
  const {movieId} = useParams()
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    if (movieId) {
      AdminService
        .getMovie(movieId)
        .then(response => {
          if (response.data.message === 'success') {
            setMovie(response.data.movie)
          }
        })
        .catch(err => {
          Toast.displayErrorMessage("Не удалось получить данные фильма!")
        })
    }
  }, [])

  if (!movie) return <Layout hasAppBar/>
  return (
    <Layout hasAppBar>
      <EditMovieForm movie={movie}/>
    </Layout>
  )
}

const EditMovieForm = ({movie}) => {
  const {formState, handleSubmit, control} = useForm({
    mode: "onSubmit",
    defaultValues: {...movie}
  })
  const {errors, isSubmitting} = formState


  const onSubmit = async (data) => {
    AdminService
      .updateMovie(data, movie.id)
      .then(response => {
        if (response.data.message === "success") {
          Toast.displaySuccessMessage("Ваши изменения сохранены!")
        }
      })
      .catch(err => {
        Toast.displayErrorMessage("Произошла ошибка при редактировании фильма!")
      })
  }

  return (
    <div>
      <div className={s.root}>
        <h2 className={s.title}>Редактирование существующего фильма</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item md={8}>
              <FormGroup>
                <Controller
                  control={control}
                  name="title"
                  render={({field: {onChange, value}}) => (
                    <TextField
                      required
                      name="title"
                      value={value}
                      onChange={onChange}
                      error={errors.title?.message || false}
                      variant="outlined"
                      label="Название фильма"
                    />
                  )}
                />
                <FormHelperMessage>{errors.title?.message}</FormHelperMessage>
              </FormGroup>
            </Grid>

            <Grid item md={8}>
              <FormGroup>
                <Controller
                  control={control}
                  name="description"
                  render={({field: {onChange, value}}) => (
                    <TextField
                      required
                      multiline
                      rows={3}
                      name="description"
                      value={value}
                      onChange={onChange}
                      error={errors.description?.message || false}
                      variant="outlined"
                      label="Описание фильма"
                    />
                  )}
                />
                <FormHelperMessage>{errors.description?.message}</FormHelperMessage>
              </FormGroup>
            </Grid>

            <Grid item md={8}>
              <FormGroup>
                <Controller
                  control={control}
                  name="release_date"
                  render={({field: {onChange, value}}) => (
                    <TextField
                      required
                      type="date"
                      name="release_date"
                      value={value}
                      onChange={onChange}
                      error={errors.release_date?.message || false}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true
                      }}
                      label="Дата выхода фильма"
                    />
                  )}
                />
                <FormHelperMessage>{errors.release_date?.message}</FormHelperMessage>
              </FormGroup>
            </Grid>

            <Grid item md={8}>
              <FormGroup>
                <Controller
                  control={control}
                  name="image_url"
                  render={({field: {onChange, value}}) => (
                    <TextField
                      required
                      name="image_url"
                      value={value}
                      onChange={onChange}
                      error={errors.image_url?.message || false}
                      variant="outlined"
                      label="Ссылка на изображение"
                    />
                  )}
                />
                <FormHelperMessage>{errors.image_url?.message}</FormHelperMessage>
              </FormGroup>
            </Grid>

            <Grid item md={8}>
              <FormGroup>
                <Controller
                  control={control}
                  name="banner_url"
                  render={({field: {onChange, value}}) => (
                    <TextField
                      required
                      name="image_url"
                      value={value}
                      onChange={onChange}
                      error={errors.banner_url?.message || false}
                      variant="outlined"
                      label="Ссылка на баннерное изображение"
                    />
                  )}
                />
                <FormHelperMessage>{errors.banner_url?.message}</FormHelperMessage>
              </FormGroup>
            </Grid>

            <Grid item md={8}>
              <FormGroup>
                <Controller
                  control={control}
                  name="preview_url"
                  render={({field: {onChange, value}}) => (
                    <TextField
                      name="preview_url"
                      required
                      value={value}
                      onChange={onChange}
                      error={errors.preview_url?.message || false}
                      variant="outlined"
                      label="Ссылка на трейлер"
                    />
                  )}
                />
                <FormHelperMessage>{errors.preview_url?.message}</FormHelperMessage>
              </FormGroup>
            </Grid>

            <Grid item md={8}>
              <FormGroup>
                <Controller
                  control={control}
                  name="imdb_url"
                  render={({field: {onChange, value}}) => (
                    <TextField
                      name="imdb_url"
                      value={value}
                      onChange={onChange}
                      error={errors.imdb_url?.message || false}
                      variant="outlined"
                      label="Ссылка на фильм в рейтинге IMDB"
                    />
                  )}
                />
                <FormHelperMessage>{errors.imdb_url?.message}</FormHelperMessage>
              </FormGroup>
            </Grid>
          </Grid>
          <Button
            startIcon={<Edit/>}
            variant="outlined"
            color="warning"
            disabled={isSubmitting}
            type="submit"
          >
            Изменить данные
          </Button>
        </form>
      </div>
    </div>
  )
}

export {EditMovie}
