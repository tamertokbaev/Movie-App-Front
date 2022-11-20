import React from "react";
import s from "./Layout.module.scss"
import Header from "../header/Header";

const Layout = (props) => {
  const {children, hasAppBar} = props

  return (
    <div>
      <Header/>
      <main className="container">
        {children}
      </main>
    </div>
  )
}

export default Layout
