import React, {useEffect, useState} from "react"
import Skeleton, {SkeletonTheme} from "react-loading-skeleton"
import "./playlist.css"
import {Link} from "react-router-dom"
import HeartIcon from "../../app/icons/HeartIcon";
import clsx from "clsx";
import {useUserContext} from "../../app/context/userContext";

const PlaylistCard = ({playlist}) => {
  const [isLoading, setIsLoading] = useState(true)
  const {userInfo} = useUserContext()

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  return <>
    {
      isLoading
        ?
        <div className="cards">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2}/>
          </SkeletonTheme>
        </div>
        :
        <Link to={`/playlists/${playlist.id}`} style={{textDecoration: "none", color: "white"}}>
          <div className="cards">
            <div className={clsx("cards__img")}>
              <img src={playlist.preview_url}/>
            </div>
            <div className="cards__overlay">
              {playlist.is_premium ? (
                <span className="card__rating"
                      style={{fontSize: "12px", display: "flex", gap: "4px", alignItems: "center", color: "gold"}}>
                Премиум<i className="fas fa-star"/></span>
              ) : null}
              <div className="card__title">{playlist.playlist_name}</div>
              <div className="card__runtime">
                {playlist.subscribers} подписчиков
              </div>
              <div className="card__description">{playlist ? playlist.description.slice(0, 118) + "..." : ""}</div>
            </div>
          </div>
        </Link>
    }
  </>
}

export default PlaylistCard
