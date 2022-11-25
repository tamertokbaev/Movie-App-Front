import React, {useEffect, useState} from "react"
import "./home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {Link} from "react-router-dom";
import MovieList from "../../components/movieList/movieList";
import Layout from "../../components/Layout/Layout";
import {MainService} from "../../app/services/MainService";
import {Toast} from "../../app/utils/toast";

const Home = () => {

  const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    // fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
    // .then(res => res.json())
    // .then(data => setPopularMovies(data.results))
    MainService
      .getFeaturedMovies()
      .then(response => {
        if (response.data.message === "success") {
          setPopularMovies(response.data.movies)
        }
      })
      .catch(err => {
        Toast.displayErrorMessage("Не удалось получить список фильмов!")
      })
  }, [])

  return (
    <Layout disableContainerStyles headerFluid>
      <div className="poster">
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
        <MovieList/>
      </div>
    </Layout>
  )
}

export default Home
