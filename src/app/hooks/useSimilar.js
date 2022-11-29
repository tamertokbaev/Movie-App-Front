import React, {useEffect, useState} from "react";
import {MainService} from "../services/MainService";


const useSimilar = () => {
  const [similarMovies, setSimilarMovies] = useState([])

  useEffect(() => {
    MainService
      .getSimilarMovies()
      .then(res => {
        if (res.data.message === "success") {
          setSimilarMovies(res.data.movies)
        }
      })
  }, [])

  return {similarMovies}
}

export default useSimilar
