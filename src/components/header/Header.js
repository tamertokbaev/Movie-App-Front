import React from "react"
import s from "./Header.module.scss"
import {Link} from "react-router-dom"
import clsx from "clsx";

const Header = ({isSticky}) => {
  return (
    <div className={clsx(s.header, {[s.sticky]: isSticky})}>
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
