import axios from "axios";
import http from "../utils/http";
const BASE_URL = `http://138.68.67.253/api/auth`

export const signUp = (data) => {
  return http.post(`${BASE_URL}/register`, data)
}

export const signIn = (data) => {
  return http.post(`${BASE_URL}/login`, data)
}

export const getUserInfo = () => {
  return http.get(`${BASE_URL}/status`)
}

export const AuthService = {
  signIn,
  signUp,
  getUserInfo
}
