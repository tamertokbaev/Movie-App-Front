import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import s from "./PlaylistPage.module.scss"
import {PlaylistService} from "../../app/services/PlaylistService";
import {Toast} from "../../app/utils/toast";
import {Add, Remove, StarOutline} from "@mui/icons-material";
import {Button} from "@mui/material";
import {useUserContext} from "../../app/context/userContext";
import {Button as BootstrapButton} from "react-bootstrap"
import PlaylistPageAddMoviesModal from "./PlaylistPageAddMoviesModal";

const PlaylistPage = () => {
  const {id} = useParams()
  const [playlist, setPlaylist] = useState(null)
  const [isMine, setIsMine] = useState(false)
  const {userInfo} = useUserContext()
  const [openAddModal, setOpenAddModal] = useState(false)

  useEffect(() => {
    Promise.all([
      getPlaylistDetails(),
      checkIfPlaylistIsMine()
    ])
  }, [])

  const getPlaylistDetails = async () => {
    PlaylistService
      .getPlaylistDetails(id)
      .then(response => {
        setPlaylist(response.data.playlist)
      })
      .catch(err => Toast.displayErrorMessage("Произошла ошибка при получении информации о плейлисте!"))
  }

  const togglePlaylist = () => {
    PlaylistService.togglePlaylistSubscription(id)
      .then(response => {
        Toast.displaySuccessMessage("Плейлист успешно добавлен/удален из подписок")
        getPlaylistDetails()
      })
      .catch(err => Toast.displayErrorMessage("Произошла ошибка при добавлении/удалении из подписок"))
  }

  const checkIfPlaylistIsMine = async () => {
    PlaylistService.checkIfPlaylistIsMine(id)
      .then(response => {
        if (response.data.result) setIsMine(response.data.result)
      })
  }

  return (
    <Layout>
      <div className={s.playlistPage}>
        <div className={s.top}>
          <div className={s.img}>
            <img src={playlist?.preview_url} alt=""/>
          </div>
          <div className={s.content}>
            <h3 className={s.title}>{playlist?.playlist_name}</h3>

            <p className={s.description}>{playlist?.description}</p>

            <p className={s.description}>
              Автор: {playlist?.author?.name}
            </p>

            <span>{playlist?.subscribers.length || 0} подписчиков</span>

            <div className={s.actions}>
              <Button
                variant="text"
                size="medium"
                sx={{
                  color: "#7CFC00"
                }}
                startIcon=
                  {playlist?.subscribers.find(subscriber => subscriber.email === userInfo?.email) ?
                    <Remove/> : <Add/>
                  }
                color=
                  {playlist?.subscribers.find(subscriber => subscriber.email === userInfo?.email) ?
                    "warning" : "success"
                  }
                onClick={togglePlaylist}
              >
                {playlist?.subscribers.find(subscriber => subscriber.email === userInfo?.email) ?
                  "Удалить из сохраненных" : "Добавить к себе"
                }
              </Button>
            </div>
          </div>
        </div>

        {isMine && (
          <div className="mt-2">
            <BootstrapButton
              size="large"
              variant="secondary"
              onClick={() => setOpenAddModal(true)}
            >
              Добавить фильм
            </BootstrapButton>
          </div>
        )}

        <div className={s.content}>
          <h4>Список фильмов</h4>

          <div className={s.movieList}>
            {playlist?.get_related_movies?.map(item => (
              <a href={"/movie/" + item.id} className={s.movie} key={item.id}>
                <img className={s.img} src={item.image_url} alt=""/>
                <div className={s.content}>
                  <p className={s.title}>{item.title}</p>
                  <p className={s.rating}><StarOutline fontSize="16px"/> {item.rating}</p>
                  <p>Дата выпуска: {item.release_date}</p>
                </div>
              </a>
            ))}
          </div>

          {playlist?.get_related_movies?.length === 0 && (
            <div className={s.emptyMovies}>
              Фильмов в плейлисте нет!
            </div>
          )}
        </div>
      </div>

      <PlaylistPageAddMoviesModal
        isOpen={openAddModal}
        handleClose={() => setOpenAddModal(false)}
        playlistId={id}
      />
    </Layout>
  )
}

export {PlaylistPage}
