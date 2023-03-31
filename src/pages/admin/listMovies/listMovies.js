import React, {useEffect, useState} from "react";
import Layout from "../../../components/Layout/Layout";
import s from './AdminMoviesList.module.scss'
import {AdminService} from "../../../app/services/AdminService";
import {Toast} from "../../../app/utils/toast";
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {Link} from "react-router-dom";

const AdminMoviesList = () => {
  const [movies, setMovies] = useState([])

  const fetchMoviesList = async () => {
    AdminService.getMovies()
      .then(response => {
        if (response.data.message === 'success') {
          setMovies(response.data.items)
        }
      })
      .catch(err => {
        Toast.displayErrorMessage("Error during fetching movies!")
      })
  }

  const removeMovie = (movieId) => {
    AdminService.deleteMovie(movieId)
      .then(response => {
        if (response.data.message === 'success') {
          Toast.displaySuccessMessage("Movie is deleted!")
          fetchMoviesList()
        }
      })
      .catch(err => {
        Toast.displayErrorMessage("Error during removing movies!")
      })
  }

  useEffect(() => {
    fetchMoviesList()
  }, [])

  return (
    <Layout hasAppBar>
      <div className={s.root}>
        <h2 className={s.title}>List of movies</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Movie name</TableCell>
              <TableCell>Ratingг</TableCell>
              <TableCell>Release date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell align="center">{item.rating}</TableCell>
                <TableCell>{new Date(item.release_date).toLocaleDateString()}</TableCell>
                <TableCell align="right">
                  <Link style={{textDecoration: "none"}} to={`/admin/movie/edit/${item.id}`}>
                    <Button
                      startIcon={<Edit/>}
                      color="info">
                      Update
                    </Button>
                  </Link>
                  <Button
                    onClick={() => removeMovie(item.id)}
                    startIcon={<Delete/>}
                    color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  )
}

export default AdminMoviesList
