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
        Toast.displayErrorMessage("Error during fetching movies!")
      })
  }

  const removeMovie = (movieId) => {
    AdminService.deleteGenre(movieId)
      .then(response => {
        if (response.data.message === 'success') {
          Toast.displaySuccessMessage("Genre is deleted!")
          fetchMoviesList()
        }
      })
      .catch(err => {
        Toast.displayErrorMessage("Error during deleting genre!")
      })
  }

  useEffect(() => {
    fetchMoviesList()
  }, [])

  return (
    <Layout hasAppBar>
      <div className={s.root}>
        <h2 className={s.title}>List of genres</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Genre name</TableCell>
              <TableCell>Attach movies</TableCell>
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
                    Attach movie
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Link style={{textDecoration: "none"}} to={`/admin/genre/edit/${item.id}`}>
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
