import {createContext, useContext} from "react";

export const UserContext = createContext({
  userInfo: null,
  updateUserInfo: () => {}
})

export const useUserContext = () => {
  return useContext(UserContext)
}
