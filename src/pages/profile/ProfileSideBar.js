import React from "react";
import s from "./Profile.module.scss"
import clsx from "clsx";
import useMediaQuery from "../../app/hooks/useMediaQuery";
import {Tab, Tabs} from "react-bootstrap";

const ProfileSideBar = ({activeItemIndex, changeActiveSection}) => {
  const isBiggerThanTablet = useMediaQuery("(min-width: 768px)")

  return (
    <div className={s.sidebar}>
      {isBiggerThanTablet && (
        <ul className={s.menu}>
          <li
            onClick={() => changeActiveSection(1)}
            className={clsx(s.item, {[s.active]: activeItemIndex === 1})}>
            Personal data
          </li>
          <li
            onClick={() => changeActiveSection(2)}
            className={clsx(s.item, {[s.active]: activeItemIndex === 2})}>
            Favorites
          </li>
          <li
            onClick={() => changeActiveSection(3)}
            className={clsx(s.item, {[s.active]: activeItemIndex === 3})}>
            Saved playlist
          </li>
        </ul>
      )}
      {!isBiggerThanTablet && (
        <Tabs
          defaultActiveKey="home"
          fill
          onSelect={(k) => k === "home" ? changeActiveSection(1) : k === "profile" ? changeActiveSection(2) : changeActiveSection(3)}
        >
          <Tab className={s.tab} active={activeItemIndex === 1} onClick={() => {
            console.log("Changed tab")
            changeActiveSection(1)
          }} eventKey="home" title="Personal">
            {/*<Sonnet />*/}
          </Tab>
          <Tab className={s.tab} active={activeItemIndex === 2} onClick={() => changeActiveSection(2)} eventKey="profile" title="Favorites">
            {/*<Sonnet />*/}
          </Tab>
          <Tab className={s.tab} active={activeItemIndex === 3} onClick={() => changeActiveSection(3)} eventKey="longer-tab" title="Playlists">
            {/*<Sonnet />*/}
          </Tab>
        </Tabs>
      )}
    </div>
  )
}

export {ProfileSideBar}
