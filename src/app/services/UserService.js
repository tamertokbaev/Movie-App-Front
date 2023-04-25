import http from "../utils/http";
const BASE_URL = window.Android ? `http://10.0.2.2:8000/api/user` : `http://localhost:8000/api/user`

const getUserFamilySubscribers = (userId) => {
  return http.get(`${BASE_URL}/family`, {
    params: {
      userId
    }
  })
}

const addNewUserIntoSubscription = (email) => {
  return http.post(`${BASE_URL}/family_add`, {email})
}

export const UserService = {
  getUserFamilySubscribers,
  addNewUserIntoSubscription
}
