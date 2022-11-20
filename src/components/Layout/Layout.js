import React from "react";
import s from "./Layout.module.scss"
import Header from "../header/Header";
import AppBarLeft from "../AppBar/AppBarLeft";

const Layout = (props) => {
  const {children, hasAppBar} = props

  return (
    <div>
      <Header/>
      {hasAppBar ? <AppBarLeft/> : null}
      <main className="container" style={hasAppBar ? {marginLeft: "260px"} : undefined}>
        {children}
      </main>
    </div>
  )
}

export default Layout
