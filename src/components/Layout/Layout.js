import React from "react";
import s from "./Layout.module.scss"
import Header from "../header/Header";
import AppBarLeft from "../AppBar/AppBarLeft";

const Layout = (props) => {
  const {children, hasAppBar, disableContainerStyles, headerFluid, hasAuthBg} = props

  return (
    <div className={s.root} style={hasAuthBg ? {background: "url('/auth_bg.jpeg')", backgroundSize: "cover"} : undefined}>
      <Header/>
      {hasAppBar ? <AppBarLeft/> : null}
      <main
        className={!disableContainerStyles ?  "container" : undefined}
        style={hasAppBar ? {marginLeft: "260px", marginTop: "90px"} : {marginTop: "90px"}}>
        {children}
      </main>
    </div>
  )
}

export default Layout
