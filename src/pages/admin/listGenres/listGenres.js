import React, {useEffect, useState} from "react";
import Layout from "../../../components/Layout/Layout";
import s from './AdminGenresList.module.scss'
import {AdminService} from "../../../app/services/AdminService";
import {Toast} from "../../../app/utils/toast";
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {Attachment, Delete, Edit} from "@mui/icons-material";
import {Link} from "react-router-dom";
import AttachMovie from "./AttachMovie";

const AdminGenresList = () => {
  const [genres, setGenres] = useState([])
  const [attachModalOpen, setAttachModalOpen] = useState(false)
  const [selectedGenre, setSelectedGenre] = useState(null)

  const openModal = (genre) => {
    setAttachModalOpen(true)
    setSelectedGenre(genre)
  }

  const closeModal = () => {
    setSelectedGenre(null)
    setAttachModalOpen(false)
  }

  const fetchMoviesList = async () => {
    AdminService.getGenres()
      .then(response => {
        if (response.data.message === 'success') {
          setGenres(response.data.items)
        }
      })
      .catch(err => {
        Toast.displayErrorMessage("Произошла ошибка при загрузке списка жанров!")
      })
  }

  const removeMovie = (movieId) => {
    AdminService.deleteGenre(movieId)
      .then(response => {
        if (response.data.message === 'success') {
          Toast.displaySuccessMessage("Жанр успешно удален!")
          fetchMoviesList()
        }
      })
      .catch(err => {
        Toast.displayErrorMessage("Произошла ошибка при удалении жанра!")
      })
  }

  useEffect(() => {
    fetchMoviesList()
  }, [])

  return (
    <Layout hasAppBar>
      <div className={s.root}>
        <h2 className={s.title}>Список жанров</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Название жанра</TableCell>
              <TableCell>Прикрепить фильм</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {genres.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.genre_name}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => openModal(item)}
                    size="small"
                    variant="outlined"
                    startIcon={<Attachment/>}
                    color="info">
                    Прикрепить фильм
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Link style={{textDecoration: "none"}} to={`/admin/genre/edit/${item.id}`}>
                    <Button
                      startIcon={<Edit/>}
                      color="info">
                      Редактировать
                    </Button>
                  </Link>
                  <Button
                    onClick={() => removeMovie(item.id)}
                    startIcon={<Delete/>}
                    color="error">
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {attachModalOpen && selectedGenre && (
          <AttachMovie
            isOpen={attachModalOpen}
            genre={selectedGenre}
            handleClose={closeModal}
            fetchInfoAgain={fetchMoviesList}
          />
        )}
      </div>
    </Layout>
  )
}

export default AdminGenresList
