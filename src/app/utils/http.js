import axios from "axios";


const onRequest = (config) => {
  const token = localStorage.getItem('auth_token')
  if (config.headers && token && config.headers["Authorization"] === undefined) {
    config.headers["Authorization"] = `Bearer ${token}`
  }
  return config
}

const onRequestError = (error) => {
  return Promise.reject(error)
}

const onResponse = async (response) => {
  // if (response.data?.status_code === 305 && response.data?.message === "Could not validate credentials") {
  //   const refreshToken = StorageHandler.getFromStorage('refresh_token');
  //   try {
  //     if (refreshToken) {
  //       const authResponseData = await AuthService.renewRefreshToken(refreshToken)
  //       const authResponse = await authResponseData?.data
  //       if (authResponse?.status_code === 305 && authResponse?.message === "Could not validate credentials") {
  //         StorageHandler.removeFromStorage('access_token')
  //         StorageHandler.removeFromStorage('refresh_token')
  //       } else if (authResponse.status === true && authResponse.message === "Success") {
  //         StorageHandler.writeIntoStorage('access_token', authResponse.result?.access_token)
  //         StorageHandler.writeIntoStorage('refresh_token', authResponse.result?.refresh_token)
  //         return axiosInstance(response.config)
  //       }
  //     }
  //   } catch (e: any) {
  //     return response;
  //   }
  // }
  return response
}

const onResponseError = async (error) => {
  return Promise.reject(error);
}

const axiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
  }
})

axiosInstance.interceptors.request.use(onRequest, onRequestError)
// axiosInstance.interceptors.response.use(onResponse, onResponseError)

export default axiosInstance
