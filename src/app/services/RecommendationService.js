import http from "../utils/http";
const BASE_URL = window.Android ? `http://10.0.2.2:9000` : `http://0.0.0.0:9000`

const getRecommendations = (movieId, userId) => {
  return http.get(`${BASE_URL}/recommendations`, {
    params: {
      movie_id: movieId,
      user_id: userId
    }
  })
}

export const RecommendationService = {
  getRecommendations,
}
