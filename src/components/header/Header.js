import React from "react"
import s from "./Header.module.scss"
import {Link} from "react-router-dom"

const Header = () => {
  return (
    <div className={s.header}>
      <div className={s.left}>
        <Link to="/">
          <img className={s.logo} src="logo.png"/>
        </Link>
      </div>

      <div className={s.right}>
        <Link to="/sign_in">
          Войти
        </Link>
        <Link to="/sign_up">Зарегистрироваться</Link>
      </div>
    </div>
  )
}

export default Header
