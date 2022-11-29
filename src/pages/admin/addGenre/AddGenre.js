import React from "react";
import Layout from "../../../components/Layout/Layout";
import s from './AddGenre.module.scss'
import {Controller, useForm} from "react-hook-form";
import {Button, Grid, Paper, TextField} from "@mui/material";
import FormHelperMessage from "../../../components/Form/FormHelperMessage";
import FormGroup from "../../../components/Form/FormGroup";
import AddIcon from '@mui/icons-material/Add';
import {AdminService} from "../../../app/services/AdminService";
import {Toast} from "../../../app/utils/toast";

const AddGenre = () => {
  const {formState, handleSubmit, control, reset} = useForm({
    mode: "onSubmit"
  })
  const {errors, isSubmitting} = formState

  const onSubmit = async (data) => {
    AdminService
      .createGenre(data)
      .then(response => {
        if (response.data.message === "success") {
          Toast.displaySuccessMessage("Новый жанр успешно добавлен!")
          reset()
        }
      })
      .catch(err => {
        Toast.displayErrorMessage("Произошла ошибка при создании жанра!")
      })
  }

  return (
    <Layout hasAppBar>
      <div className={s.root}>
        <h2 className={s.title}>Добавить новый жанр</h2>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid spacing={1} container>
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
            startIcon={<AddIcon/>}
            variant="outlined"
            color="warning"
            disabled={isSubmitting}
            type="submit"
          >
            Добавить новый жанр
          </Button>
        </form>
      </div>
    </Layout>
  )
}

export {AddGenre}
