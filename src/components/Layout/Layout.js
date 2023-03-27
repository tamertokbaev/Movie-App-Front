import React from "react";
import s from "./Layout.module.scss"
import Header from "../header/Header";
import AppBarLeft from "../AppBar/AppBarLeft";
import clsx from "clsx";

const Layout = (props) => {
  const {children, hasAppBar, disableHeader, disableContainerStyles, headerFluid, hasAuthBg} = props

  return (
    <div className={clsx(s.root, {[s.adminBackground]: hasAppBar})} style={hasAuthBg ? {background: "url('/auth_bg.jpeg')", backgroundSize: "cover"} : undefined}>
      {disableHeader ? null : <Header/>}
      {hasAppBar ? <AppBarLeft/> : null}
      <main
        className={!disableContainerStyles ?  "container" : undefined}
        style={hasAppBar ? {marginLeft: "260px", marginTop: "90px"} : disableHeader ? {} : {marginTop: "90px"}}>
        {children}
      </main>
    </div>
  )
}

export default Layout
