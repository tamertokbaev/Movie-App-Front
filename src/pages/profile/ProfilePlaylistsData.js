import React, {useEffect, useState} from "react";
import s from "./Profile.module.scss"
import {PlaylistService} from "../../app/services/PlaylistService";
import PlaylistCard from "../../components/playlist/playlist";

const ProfilePlaylistsData = () => {
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    PlaylistService.getMyAddedPlaylists()
      .then(res => {
        setPlaylists(res.data.playlists)
      })
  }, [])

  return (
    <div className={s.content}>
      <h2>Добавленные плейлисты</h2>
      {playlists.length === 0 && (
        <div className={s.empty}>
          <h3>Пока еще не добавлен ни один фильм в сохраненное!</h3>
        </div>
      )}
      {playlists.map(item => (
        <PlaylistCard
          key={item.id}
          playlist={item}
        />
      ))}
    </div>
  )
}

export default ProfilePlaylistsData
