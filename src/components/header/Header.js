import React from "react"
import s from "./Header.module.scss"
import {Link, useNavigate} from "react-router-dom"
import clsx from "clsx";
import {useUserContext} from "../../app/context/userContext";
import {alpha, Avatar, Button, IconButton, InputBase, Menu, MenuItem, styled, Tooltip} from "@mui/material";
import SearchIcon from "../../app/icons/SearchIcon";
import {MainService} from "../../app/services/MainService";

const Header = ({fluid}) => {
  const {userInfo, updateUserInfo} = useUserContext()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const logOut = () => {
    localStorage.removeItem('auth_token')
    updateUserInfo(null)
    setAnchorEl(null)
  }

  const performSearch = (event) => {
    event.preventDefault()
    MainService
      .search(event.target.slug.value)
      .then(response => {
        if (response.data.message === "success") {
          console.log(response.data)
        }
      })
  }

  return (
    <div className={clsx(s.header, {[s.fluid]: fluid})}>
      <div className={s.left}>
        <Link to="/">
          <img className={s.logo} src={"/logo.png"}/>
        </Link>
        <Link>
          Популярное
        </Link>
      </div>

      <div className={s.search}>
        <div className={s.inputContainer}>
          <form method="get" onSubmit={performSearch}>
            <input
              name="slug"
              className={s.searchInput}
              type="text"
              placeholder="Поиск по названию фильма..."
            />
            <SearchIcon/>
          </form>
        </div>
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
                sx={{ml: 2, fontSize: "18px", fontWeight: 500, textTransform: "capitalize"}}
                color="inherit"
              >
                {userInfo.name}
              </Button>
            </>
          )
        }
      </div>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        onClose={() => setAnchorEl(null)}
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <MenuItem onClick={() => {
          navigate("/profile")
          setAnchorEl(null)
        }
        }>Профиль</MenuItem>
        {userInfo?.is_superuser && (
          <MenuItem onClick={() => setAnchorEl(null)}>
            <Link style={{textDecoration: "none", color: "inherit"}} to="/admin/movie/add">
              Админ панель
            </Link>
          </MenuItem>
        )}
        <MenuItem onClick={logOut}>Выйти</MenuItem>
      </Menu>
    </div>
  )
}

export default Header
