import React, {useEffect, useState} from "react";
import Layout from "../../../components/Layout/Layout";
import s from './EditGenre.module.scss'
import {Controller, useForm} from "react-hook-form";
import {Button, Grid, TextField} from "@mui/material";
import FormHelperMessage from "../../../components/Form/FormHelperMessage";
import FormGroup from "../../../components/Form/FormGroup";
import AddIcon from '@mui/icons-material/Add';
import {AdminService} from "../../../app/services/AdminService";
import {Toast} from "../../../app/utils/toast";
import {useParams} from "react-router-dom";
import {Edit} from "@mui/icons-material";

const EditGenre = () => {
  const {genreId} = useParams()
  const [genre, setGenre] = useState(null)

  useEffect(() => {
    if (genreId) {
      AdminService
        .getGenre(genreId)
        .then(response => {
          if (response.data.message === 'success') {
            setGenre(response.data.genre)
          }
        })
        .catch(err => {
          Toast.displayErrorMessage("Не удалось получить данные жанра!")
        })
    }
  }, [])

  if (!genre) return <Layout hasAppBar/>
  return (
    <Layout hasAppBar>
      <EditGenreForm genre={genre}/>
    </Layout>
  )
}

const EditGenreForm = ({genre}) => {
  const {formState, handleSubmit, control} = useForm({
    mode: "onSubmit",
    defaultValues: {...genre}
  })
  const {errors, isSubmitting} = formState


  const onSubmit = async (data) => {
    AdminService
      .updateGenre(data, genre.id)
      .then(response => {
        if (response.data.message === "success") {
          Toast.displaySuccessMessage("Ваши изменения сохранены!")
        }
      })
      .catch(err => {
        Toast.displayErrorMessage("Произошла ошибка при редактировании жанра!")
      })
  }

  return (
    <div>
      <div className={s.root}>
        <h2 className={s.title}>Редактирование существующего жанра</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item md={8}>
              <FormGroup>
                <Controller
                  control={control}
                  name="genre_name"
                  render={({field: {onChange, value}}) => (
                    <TextField
                      required
                      name="genre_name"
                      value={value}
                      onChange={onChange}
                      error={errors.genre_name?.message || false}
                      variant="outlined"
                      label="Название жанра"
                    />
                  )}
                />
                <FormHelperMessage>{errors.genre_name?.message}</FormHelperMessage>
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

export {EditGenre}
