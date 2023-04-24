import React, {useEffect, useState} from "react";
import {MainService} from "../services/MainService";
import {useUserContext} from "../context/userContext";
import {RecommendationService} from "../services/RecommendationService";


const useSimilar = (movieId) => {
  const [similarMovies, setSimilarMovies] = useState([])
  const {userInfo} = useUserContext()

  useEffect(() => {
    // MainService
    //   .getSimilarMovies()
    //   .then(res => {
    //     if (res.data.message === "success") {
    //       setSimilarMovies(res.data.movies)
    //     }
    //   })
    RecommendationService.getRecommendations(movieId, userInfo.id)
      .then(res => {
        if (Array.isArray(res.data)) {
          setSimilarMovies(res.data)
        }
      })
  }, [])

  return {similarMovies}
}

export default useSimilar
