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
    navigate(`/search?slug=${event.target.slug.value}`)
  }

  return (
    <div className={clsx(s.header, {[s.fluid]: fluid})}>
      <div className={s.left}>
        <Link to="/">
          <img className={s.logo} src={"/var1.svg"}/>
        </Link>
        <Link to="/popular">
          Popular
        </Link>
        <Link to="/last-released">
          New movies
        </Link>
        <Link to="/playlists">
          Playlists
        </Link>
      </div>

      <div className={s.search}>
        <div className={s.inputContainer}>
          <form method="get" onSubmit={performSearch}>
            <input
              name="slug"
              className={s.searchInput}
              type="text"
              placeholder="Search by movie name..."
            />
            <SearchIcon/>
          </form>
        </div>
      </div>

      <div className={s.right}>
        {!userInfo ? (
            <>
              <Link to="/sign_in">Sign in</Link>
              <Link to="/sign_up">Sign up</Link>
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
        }>Profile</MenuItem>
        {userInfo?.is_superuser ? (
          <MenuItem onClick={() => setAnchorEl(null)}>
            <Link style={{textDecoration: "none", color: "inherit"}} to="/admin/movie/add">
              Admin panel
            </Link>
          </MenuItem>
        ) : null}
        <MenuItem onClick={logOut}>Log out</MenuItem>
      </Menu>
    </div>
  )
}

export default Header
