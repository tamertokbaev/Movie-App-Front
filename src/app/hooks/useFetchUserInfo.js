import React, {useEffect, useState} from "react";
import {AuthService} from "../services/AuthService";
import {Android} from "@mui/icons-material";

const useFetchUserInfo = () => {
  const [user, setUser] = useState(undefined)

  const updateUserInfo = (user) => {
    setUser(user)
  }

  useEffect(() => {
    if (window.Android) {
      const token = window.Android.getToken()
      localStorage.setItem('auth_token', token)
      if (token) fetchUserInfo()
    } else {
      const accessToken = localStorage.getItem('auth_token')
      if (accessToken) {
        fetchUserInfo()
      } else setUser(null)
    }
  }, [])

  const fetchUserInfo = async (authToken) => {
    const authRequest = await AuthService
      .getUserInfo(authToken)
      .then(response => {
        updateUserInfo(response.data.user)
      })
      .catch((error) => {
        localStorage.removeItem('auth_token')
        updateUserInfo(null)
      })
  }

  return {userInfo: user, updateUserInfo}
}

export default useFetchUserInfo
