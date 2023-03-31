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
import {Form} from "react-bootstrap";

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
          Toast.displayErrorMessage("Error during fetching genre!")
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
          Toast.displaySuccessMessage("Your changes applied!")
        }
      })
      .catch(err => {
        Toast.displayErrorMessage("Error during updating genre!")
      })
  }

  return (
    <div>
      <div className={s.root}>
        <h2 className={s.title}>Updating existing genre</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item md={8}>
              <Form.Group controlId="controlGenreName" className="mb-3">
                <Controller
                  control={control}
                  name="genre_name"
                  render={({field: {onChange, value}}) => (
                    <Form.Control
                      name="genre_name"
                      value={value}
                      onChange={onChange}
                      isInvalid={errors.genre_name?.message}
                      placeholder="Genre name"
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.genre_name?.message}
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

export {EditGenre}
