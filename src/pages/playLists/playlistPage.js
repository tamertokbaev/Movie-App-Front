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
import PlaylistCard from "../../components/playlist/playlist";
import {TbPremiumRights} from "react-icons/tb"
import PremiumOnly from "../../components/PremiumOnly/PremiumOnly";

const PlaylistPage = () => {
  const {id} = useParams()
  const [playlist, setPlaylist] = useState(null)
  const [subscribers, setSubscribers] = useState(0)
  const [isMine, setIsMine] = useState(false)
  const {userInfo} = useUserContext()
  const [openAddModal, setOpenAddModal] = useState(false)
  const [popularPlaylists, setPopularPlaylists] = useState([])

  useEffect(() => {
    Promise.all([
      getPlaylistDetails(),
      checkIfPlaylistIsMine(),
      getPersonalizedPlaylists()
    ])
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [id])

  const getPlaylistDetails = async () => {
    PlaylistService
      .getPlaylistDetails(id)
      .then(response => {
        setPlaylist(response.data.playlist)
        setSubscribers(response.data.subscribers)
      })
      .catch(err => Toast.displayErrorMessage("Error during fetching information about playlist!"))
  }

  const togglePlaylist = () => {
    PlaylistService.togglePlaylistSubscription(id)
      .then(response => {
        Toast.displaySuccessMessage("Playlist successfully created/removed from playlist")
        getPlaylistDetails()
      })
      .catch(err => Toast.displayErrorMessage("Error during adding/removing movie from playlist"))
  }

  const checkIfPlaylistIsMine = async () => {
    PlaylistService.checkIfPlaylistIsMine(id)
      .then(response => {
        if (response.data.result) setIsMine(response.data.result)
      })
  }

  const getPersonalizedPlaylists = async () => {
    PlaylistService.getPersonalizedPlaylists()
      .then(response => {
        setPopularPlaylists(response.data.result)
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

            {playlist?.is_premium ? (
              <PremiumOnly/>
            ) : null}

            <p className={s.description}>{playlist?.description}</p>

            <p className={s.description}>
              Author: {playlist?.author?.name}
            </p>

            <span>{subscribers} subscribers</span>

            {!isMine && (
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
                    "Remove from saved" : "Save playlist"
                  }
                </Button>
              </div>
            )}
          </div>
        </div>

        {isMine && (
          <div className="mt-2">
            <BootstrapButton
              size="large"
              variant="secondary"
              onClick={() => setOpenAddModal(true)}
            >
              Add movie
            </BootstrapButton>
          </div>
        )}

        <div className={s.content}>
          <h4>List of movies</h4>

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
              There are no movies in playlist!
            </div>
          )}

          <h4 style={{marginTop: "1rem"}}>You may also like</h4>

          <div className={s.recommendationList}>
            {popularPlaylists.map(item => (
              <PlaylistCard
                key={item.id}
                playlist={item}
              />
            ))}
          </div>
        </div>
      </div>

      <PlaylistPageAddMoviesModal
        isOpen={openAddModal}
        handleClose={() => setOpenAddModal(false)}
        playlistId={id}
        refresh={getPlaylistDetails}
      />
    </Layout>
  )
}

export {PlaylistPage}
