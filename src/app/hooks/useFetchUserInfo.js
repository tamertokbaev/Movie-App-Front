import React, {useEffect, useState} from "react";
import {AuthService} from "../services/AuthService";

const useFetchUserInfo = () => {
  const [user, setUser] = useState(undefined)

  const updateUserInfo = (user) => {
    setUser(user)
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('auth_token')
    if (accessToken) {
      fetchUserInfo()
    } else setUser(null)
  }, [])

  const fetchUserInfo = async (authToken) => {
    const authRequest = await AuthService
      .getUserInfo(authToken)
      .then(response => {
        updateUserInfo(response.data.user)
      })
      .catch(() => {
        localStorage.removeItem('auth_token')
        updateUserInfo(null)
      })
  }

  return {userInfo: user, updateUserInfo}
}

export default useFetchUserInfo
