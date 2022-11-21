import React from "react";
import s from "./Layout.module.scss"
import Header from "../header/Header";
import AppBarLeft from "../AppBar/AppBarLeft";

const Layout = (props) => {
  const {children, hasAppBar, disableContainerStyles, headerFluid} = props

  return (
    <div>
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
