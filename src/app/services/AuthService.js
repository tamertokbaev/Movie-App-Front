import http from "../utils/http";
const BASE_URL = `http://10.0.2.2:8000/api/auth`

const signUp = (data) => {
  return http.post(`${BASE_URL}/register`, data)
}

const signIn = (data) => {
  return http.post(`${BASE_URL}/login`, data)
}

const getUserInfo = () => {
  return http.get(`${BASE_URL}/status`)
}

const changeUserInfo = (data) => {
  return http.put(`${BASE_URL}/change-personal-data`, data)
}

export const AuthService = {
  signIn,
  signUp,
  getUserInfo,
  changeUserInfo
}
