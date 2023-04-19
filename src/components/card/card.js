import React, {useEffect, useState} from "react"
import Skeleton, {SkeletonTheme} from "react-loading-skeleton"
import "./card.scss"
import {Link} from "react-router-dom"
import HeartIcon from "../../app/icons/HeartIcon";
import clsx from "clsx";
import {useUserContext} from "../../app/context/userContext";

const Cards = ({movie, isInFavorite, onFavoritesClick}) => {
  const [isLoading, setIsLoading] = useState(true)
  const {userInfo} = useUserContext()

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
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
        <Link to={`/movie/${movie.id}`} style={{textDecoration: "none", color: "white"}}>
          <div className="cards">
            <div className={clsx("cards__img", {["fav"]: isInFavorite})}>
              <img src={movie.image_url}/>
              {userInfo && (
                <button onClick={event => {
                  event.preventDefault()
                  onFavoritesClick(movie.id)
                }}>
                  <HeartIcon size={18}/>
                </button>
              )}
            </div>
            <div className="cards__overlay">
              {movie.is_premium ? (
                <span className="card__rating"
                      style={{fontSize: "12px", display: "flex", gap: "4px", alignItems: "center", color: "gold"}}>
                Premium<i className="fas fa-star"/></span>
              ) : null}
              <div className="card__title">{movie.title}</div>
              <div className="card__runtime">
                {new Date(movie.release_date).toLocaleDateString()}
                <span className="card__rating">{movie.rating}<i className="fas fa-star"/></span>
              </div>
              <div className="card__description">{movie ? movie.description.slice(0, 118) + "..." : ""}</div>
            </div>
          </div>
        </Link>
    }
  </>
}

export default Cards
