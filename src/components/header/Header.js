import React from "react"
import s from "./Header.module.scss"
import {Link} from "react-router-dom"
import clsx from "clsx";
import {useUserContext} from "../../app/context/userContext";
import {Avatar, Button, IconButton, Tooltip} from "@mui/material";

const Header = ({isSticky}) => {
  const {userInfo, updateUserInfo} = useUserContext()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = () => {

  }

  return (
    <div className={clsx(s.header, {[s.sticky]: isSticky})}>
      <div className={s.left}>
        <Link to="/">
          <img className={s.logo} src="logo.png"/>
        </Link>
        <Link>
          Популярное
        </Link>
      </div>

      <div className={s.right}>
        {!userInfo ? (
            <>
              <Link to="/sign_in">Войти</Link>
              <Link to="/sign_up">Зарегистрироваться</Link>
            </>
          ) :
          (
            <>
              <Button
                onClick={handleClick}
                size="small"
                sx={{ml: 2, color: "#fff", fontSize: "18px", fontWeight: 500, textTransform: "capitalize"}}
                color="success"
              >
                {userInfo.name}
              </Button>
            </>
          )
        }
      </div>
    </div>
  )
}

export default Header
