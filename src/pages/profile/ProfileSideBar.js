import React from "react";
import s from "./Profile.module.scss"
import clsx from "clsx";

const ProfileSideBar = ({activeItemIndex, changeActiveSection}) => {

  return (
    <div className={s.sidebar}>
      <ul className={s.menu}>
        <li
          onClick={() => changeActiveSection(1)}
          className={clsx(s.item, {[s.active]: activeItemIndex === 1})}>
          Личные данные
        </li>
        <li
          onClick={() => changeActiveSection(2)}
          className={clsx(s.item, {[s.active]: activeItemIndex === 2})}>
          Избранное
        </li>
      </ul>
    </div>
  )
}

export {ProfileSideBar}
