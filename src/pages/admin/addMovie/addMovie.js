import React from "react";
import Layout from "../../../components/Layout/Layout";
import s from './AddMovie.module.scss'
import {Controller, useForm} from "react-hook-form";
import {Button, Grid, Paper, TextField} from "@mui/material";
import FormHelperMessage from "../../../components/Form/FormHelperMessage";
import FormGroup from "../../../components/Form/FormGroup";
import AddIcon from '@mui/icons-material/Add';
import {AdminService} from "../../../app/services/AdminService";
import {Toast} from "../../../app/utils/toast";
import {Form} from "react-bootstrap"

const AddMovie = () => {
  const {formState, handleSubmit, control} = useForm({
    mode: "onSubmit"
  })
  const {errors, isSubmitting} = formState

  const onSubmit = async (data) => {
    AdminService
      .createMovie(data)
      .then(response => {
        if (response.data.message === "success") {
          Toast.displaySuccessMessage("Новый фильм успешно добавлен!")
        }
      })
      .catch(err => {
        Toast.displayErrorMessage("Произошла ошибка при создании фильма!")
      })
  }

  return (
    <Layout hasAppBar>
      <div className={s.root}>
        <h2 className={s.title}>Добавить новый фильм</h2>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid spacing={1} container>
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
                      placeholder="Название фильма"
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.title?.message}
                </Form.Control.Feedback>
              </Form.Group>

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
                      placeholder="Описание фильма"
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
                      label="Дата выхода фильма"
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
                      placeholder="Ссылка на изображение"
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
                      placeholder="Ссылка на баннерное изображение"
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
                      placeholder="Ссылка на трейлер"
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
                      placeholder="Ссылка на фильм в рейтинге IMDB"
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.imdb_url?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Grid>
          </Grid>
          <Button
            startIcon={<AddIcon/>}
            variant="outlined"
            color="warning"
            disabled={isSubmitting}
            type="submit"
          >
            Добавить новый фильм
          </Button>
        </form>
      </div>
    </Layout>
  )
}

export {AddMovie}
