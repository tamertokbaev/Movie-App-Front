import React from "react";
import s from "./PremiumOnlyBackdrop.module.scss"

const PremiumOnlyBackdrop = () => {

  return (
    <div className={s.root}>
      <div className={s.content}>
        <p>
          This content is available only for premium users
        </p>
      </div>
    </div>
  )
}

export default PremiumOnlyBackdrop
