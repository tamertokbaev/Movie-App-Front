import React from "react";
import s from "./Layout.module.scss"
import Header from "../header/Header";

const Layout = (props) => {
  const {children} = props

  return (
    <div>
      <Header/>
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout
