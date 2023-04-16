import React, {useEffect, useState} from "react"
import "./home.scss"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {Link} from "react-router-dom";
import MovieList from "../../components/movieList/movieList";
import Layout from "../../components/Layout/Layout";
import {MainService} from "../../app/services/MainService";
import {Toast} from "../../app/utils/toast";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import useMediaQuery from "../../app/hooks/useMediaQuery";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const isBiggerThanTablet = useMediaQuery("(min-width: 768px)")

  useEffect(() => {
    MainService
      .getFeaturedMovies()
      .then(response => {
        if (response.data.message === "success") {
          setPopularMovies(response.data.movies)
        }
      })
      .catch(err => {
        Toast.displayErrorMessage("Error during fetching movies!")
      })
      .finally(() => {
      })
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  return (
    <Layout disableHeader={!isBiggerThanTablet} disableContainerStyles headerFluid>
      <div className="poster" style={{marginTop: "-5px"}}>
        {isLoading ? <div style={{height: 600}}>
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={600} duration={2}/>
          </SkeletonTheme>
        </div> : (
          <Carousel
            showThumbs={false}
            autoPlay={true}
            transitionTime={3}
            infiniteLoop={true}
            showStatus={false}
          >
            {
              popularMovies.map(movie => (
                <Link style={{textDecoration: "none", color: "white"}} to={`/movie/${movie.id}`}>
                  <div className="posterImage">
                    <img src={movie.banner_url}/>
                  </div>
                  <div className="posterImage__overlay">
                    <div className="posterImage__title">{movie.title}</div>
                    <div className="posterImage__runtime">
                      {new Date(movie.release_date).toLocaleDateString()}
                      <span className="posterImage__rating">
                                            {movie.rating}
                        <i className="fas fa-star"/>{" "}
                                        </span>
                    </div>
                    <div className="posterImage__description">{movie.description}</div>
                  </div>
                </Link>
              ))
            }
          </Carousel>
        )}
        <MovieList/>
      </div>
    </Layout>
  )
}

export default Home
