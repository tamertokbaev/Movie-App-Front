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
import {Form} from "react-bootstrap";

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
          Toast.displaySuccessMessage("Your changes applied!")
        }
      })
      .catch(err => {
        Toast.displayErrorMessage("Error during updating movie!")
      })
  }

  return (
    <div>
      <div className={s.root}>
        <h2 className={s.title}>Updating existing movie</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item md={8}>
              <Form.Group controlId="controlTitle" className="mb-3">
                <Controller
                  control={control}
                  name="title"
                  render={({field: {onChange, value}}) => (
                    <Form.Control
                      name="title"
                      value={value}
                      onChange={onChange}
                      isInvalid={errors.title?.message}
                      placeholder="Movie name"
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.title?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Grid>

            <Grid item md={8}>
              <Form.Group controlId="controlDescription" className="mb-3">
                <Controller
                  control={control}
                  name="description"
                  render={({field: {onChange, value}}) => (
                    <Form.Control
                      name="description"
                      value={value}
                      onChange={onChange}
                      isInvalid={errors.description?.message}
                      placeholder="Movie description"
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.description?.message}
                </Form.Control.Feedback>
              </Form.Group>
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
                      label="Release date"
                    />
                  )}
                />
                <FormHelperMessage>{errors.release_date?.message}</FormHelperMessage>
              </FormGroup>
            </Grid>

            <Grid item md={8}>
              <Form.Group controlId="controlImageUrl" className="mb-3">
                <Controller
                  control={control}
                  name="image_url"
                  render={({field: {onChange, value}}) => (
                    <Form.Control
                      name="image_url"
                      value={value}
                      onChange={onChange}
                      isInvalid={errors.image_url?.message}
                      placeholder="Preview image URL"
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.image_url?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Grid>

            <Grid item md={8}>
              <Form.Group controlId="controlBannerUrl" className="mb-3">
                <Controller
                  control={control}
                  name="banner_url"
                  render={({field: {onChange, value}}) => (
                    <Form.Control
                      name="banner_url"
                      value={value}
                      onChange={onChange}
                      isInvalid={errors.banner_url?.message}
                      placeholder="Banner image URL"
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.banner_url?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Grid>

            <Grid item md={8}>
              <Form.Group controlId="controlPreviewUrl" className="mb-3">
                <Controller
                  control={control}
                  name="preview_url"
                  render={({field: {onChange, value}}) => (
                    <Form.Control
                      name="preview_url"
                      value={value}
                      onChange={onChange}
                      isInvalid={errors.preview_url?.message}
                      placeholder="Trailer URL"
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.preview_url?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Grid>

            <Grid item md={8}>
              <Form.Group controlId="controlImdbUrl" className="mb-3">
                <Controller
                  control={control}
                  name="imdb_url"
                  render={({field: {onChange, value}}) => (
                    <Form.Control
                      name="imdb_url"
                      value={value}
                      onChange={onChange}
                      isInvalid={errors.imdb_url?.message}
                      placeholder="IMDB link URL"
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.imdb_url?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Grid>

            <Grid item md={8}>
              <Form.Group controlId="controlImdbUrl" className="mb-3">
                <Controller
                  control={control}
                  name="is_premium"
                  render={({field: {onChange, value}}) => (
                    <Form.Check
                      name="is_premium"
                      value={value}
                      checked={value}
                      onChange={onChange}
                      isInvalid={errors.imdb_url?.message}
                      label="Premium"
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.is_premium?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Grid>
          </Grid>
          <Button
            startIcon={<Edit/>}
            variant="outlined"
            color="warning"
            disabled={isSubmitting}
            type="submit"
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  )
}

export {EditMovie}
