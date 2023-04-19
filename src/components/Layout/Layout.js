import React from "react";
import s from "./Layout.module.scss"
import Header from "../header/Header";
import AppBarLeft from "../AppBar/AppBarLeft";
import clsx from "clsx";
import useMediaQuery from "../../app/hooks/useMediaQuery";

const Layout = (props) => {
  const {children, hasAppBar, disableHeader, disableContainerStyles, headerFluid, hasAuthBg} = props
  const isBiggerThanTablet = useMediaQuery("(min-width: 768px)")

  return (
    <div className={clsx(s.root, {[s.adminBackground]: hasAppBar})} style={hasAuthBg ? {background: "url('/auth_bg.jpeg')", backgroundSize: "cover"} : undefined}>
      {!isBiggerThanTablet ? null : <Header/>}
      {hasAppBar ? <AppBarLeft/> : null}
      <main
        className={!disableContainerStyles ?  "container" : undefined}
        style={hasAppBar ? {marginLeft: "260px", marginTop: "90px"} : !isBiggerThanTablet ? {} : {marginTop: "90px"}}>
        {children}
      </main>
    </div>
  )
}

export default Layout
