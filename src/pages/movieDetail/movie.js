import React, {useEffect, useState} from "react"
import s from "./Movie.module.scss"
import {useParams} from "react-router-dom"
import Layout from "../../components/Layout/Layout";
import {MainService} from "../../app/services/MainService";
import {Toast} from "../../app/utils/toast";
import HeartIcon from "../../app/icons/HeartIcon";
import clsx from "clsx";
import useFavoriteMovies from "../../app/hooks/useFavoriteMovies";
import useSimilar from "../../app/hooks/useSimilar";
import Card from "../../components/card/card";
import PremiumOnly from "../../components/PremiumOnly/PremiumOnly";

const Movie = () => {
  const {checkIsMovieInFavorite, handleAddOrRemoveFavorites} = useFavoriteMovies()
  const {similarMovies} = useSimilar()
  const [currentMovieDetail, setMovie] = useState()
  const {id} = useParams()

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    getData()
    // window.scrollTo(0, 0)
  }, [id])

  const getData = () => {
    MainService.getMovieInfo(id)
      .then(response => {
        if (response.data.message === 'success') {
          console.log(response.data)
          setMovie(response.data.movie)
        }
      })
      .catch(err => {
        Toast.displayErrorMessage("Не удалось получить информацию о фильме!")
      })
  }

  return (
    <Layout disableContainerStyles>
      <div className={s.movie}>
        <div className={s.movie__intro}>
          <img className={s.movie__backdrop}
               src={currentMovieDetail?.banner_url}/>
        </div>
        <div className={s.movie__detail}>
          <div className={s.movie__detailLeft}>
            <div>
              <img className={s.movie__poster}
                   src={currentMovieDetail?.image_url}/>
            </div>
          </div>
          <div className={s.movie__detailRight}>
            <div className={s.movie__detailRightTop}>
              <div className={s.movie__name}>{currentMovieDetail?.title}</div>
              {/*<div className="movie__tagline">{currentMovieDetail}</div>*/}
              <div>
                {currentMovieDetail ? currentMovieDetail.rating : ""} <i className="fas fa-star"/>
                {/*<span*/}
                {/*  className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>*/}
              </div>
              {/*<div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>*/}
              <div>{currentMovieDetail ? "Дата выпуска: " + currentMovieDetail.release_date : ""}</div>
              <div className={s.movie__genres}>
                {
                  currentMovieDetail && currentMovieDetail.genres
                    ?
                    currentMovieDetail.genres.map(genre => (
                      <><span className={s.movie__genre} id={genre.id}>{genre.genre_name}</span></>
                    ))
                    :
                    ""
                }
              </div>
            </div>
            <div className={clsx(s.addToFavs, {[s.added]: checkIsMovieInFavorite(currentMovieDetail?.id)})}>
              <button onClick={() => handleAddOrRemoveFavorites(currentMovieDetail?.id)}>
                <HeartIcon size={24}/>
                {checkIsMovieInFavorite(currentMovieDetail?.id) ? "Удалить из избранного" : "Добавить в избранное"}
              </button>
              <div style={{width: "520px", marginTop: "0.5rem"}}>
                {currentMovieDetail?.is_premium ? (
                  <PremiumOnly/>
                ) : null}
              </div>
            </div>
            <div className={s.movie__detailRightBottom}>
              <div className={s.synopsisText}>Описание</div>
              <div>{currentMovieDetail ? currentMovieDetail.description : ""}</div>
            </div>

            <div className={s.details}>
              <h4>Подробная информация</h4>

              <div className={s.item}>
                Страна: <span>США</span>
              </div>
              <div className={s.item}>
                Жанр: <span>драма, фэнтези, криминал</span>
              </div>
              <div className={s.item}>
                Режиссер: <span>Квентин Тарантино</span>
              </div>
              <div className={s.item}>
                Возраст: <span>16+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {currentMovieDetail?.preview_url && (
        <div className={clsx("container", s.preview)}>
          <h4>Трейлер</h4>
          <iframe
            id="ytplayer" type="text/html" width="100%" height="460"
            src={currentMovieDetail.preview_url}
            frameBorder="0"/>
        </div>
      )}

      <div className={clsx("container", s.similar)}>
        <h4>Вам также может понравиться</h4>
        <div className={s.list}>
          {similarMovies.map((item, index) => (
            <Card
              key={item.id}
              movie={item}
              onFavoritesClick={handleAddOrRemoveFavorites}
              isInFavorite={() => checkIsMovieInFavorite(item.id)}
            />
          ))}
        </div>
      </div>

    </Layout>
  )
}

export default Movie
