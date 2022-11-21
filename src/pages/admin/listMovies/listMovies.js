import React, {useEffect, useState} from "react";
import Layout from "../../../components/Layout/Layout";
import s from './AdminMoviesList.module.scss'
import {AdminService} from "../../../app/services/AdminService";
import {Toast} from "../../../app/utils/toast";
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";

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
        Toast.displayErrorMessage("Произошла ошибка при загрузке списка фильмов!")
      })
  }

  useEffect(() => {
    fetchMoviesList()
  }, [])

  return (
    <Layout hasAppBar>
      <div className={s.root}>
        <h2 className={s.title}>Список фильмов</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Название фильма</TableCell>
              <TableCell>Рейтинг</TableCell>
              <TableCell>Дата выпуска</TableCell>
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
                  <Button
                    startIcon={<Edit/>}
                    color="info">
                    Редактировать
                  </Button>
                  <Button
                    startIcon={<Delete/>}
                    color="error">
                    Удалить
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
