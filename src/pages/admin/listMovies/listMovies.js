import React, {useEffect} from "react";
import Layout from "../../../components/Layout/Layout";
import s from './AdminMoviesList.module.scss'
import {AdminService} from "../../../app/services/AdminService";
import {Toast} from "../../../app/utils/toast";

const AdminMoviesList = () => {

  const fetchMoviesList = async () => {
    AdminService.getMovies()
      .then(response => {
        console.log(response.data)
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

      </div>
    </Layout>
  )
}

export default AdminMoviesList
