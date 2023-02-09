import React, {useEffect, useState} from "react";
import s from "./Playlists.module.scss"
import Layout from "../../components/Layout/Layout";
import {useUserContext} from "../../app/context/userContext";
import clsx from "clsx";
import PlaylistModal from "./PlaylistModal";
import {PlaylistService} from "../../app/services/PlaylistService";
import PlaylistCard from "../../components/playlist/playlist";

const PlayListsPage = () => {
  const {userInfo} = useUserContext()
  const [isOpen, setIsOpen] = useState(false)
  const [popularPlaylists, setPopularPlaylists] = useState([])

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  useEffect(() => {
    PlaylistService.getPopularPlaylists()
      .then(response => {
        setPopularPlaylists(response.data.playlists)
      })
  }, [])


  return (
    <Layout disableContainerStyles>
      <main className={s.root}>
        <div className={s.banner}>
          <div className={clsx(s.hero, "container")}>

            <div className={s.left}>
              <h3 className={s.title}>Делитесь со всем миром своей подборкой фильмов</h3>

              <p className={s.description}>Вы можете подписаться на других авторов либо же создать свою подборку</p>

              <div className={s.actions}>
                <button onClick={openModal} className={s.subscribe}>Создать плейлист</button>
                <button className={s.subscribe}>Посмотреть популярные плейлисты</button>
              </div>
            </div>

            <div className={s.right}>
              <img src="/img/playlist_bg.png" alt=""/>
            </div>
          </div>
        </div>

        <section className="container">
          <div className={s.popular}>
            <h2>Популярные плейлисты</h2>

            <div>
              {popularPlaylists.map((item => (
                <PlaylistCard
                  key={item.id}
                  playlist={item}
                />
              )))}
            </div>
          </div>


        </section>
      </main>
      <PlaylistModal isOpen={isOpen} handleClose={closeModal}/>
    </Layout>
  )
}

export default PlayListsPage
