import React from "react";
import {TbPremiumRights} from "react-icons/tb";
import s from "./PremiumOnly.module.scss"

const PremiumOnly = () => {

  return (
    <div className={s.premiumOnly}>
      <TbPremiumRights size="36"/> This content is available only for premium users
    </div>
  )
}

export default PremiumOnly
