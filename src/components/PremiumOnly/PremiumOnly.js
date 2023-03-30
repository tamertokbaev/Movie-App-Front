import React from "react";
import {TbPremiumRights} from "react-icons/tb";
import s from "./PremiumOnly.module.scss"

const PremiumOnly = () => {

  return (
    <div className={s.premiumOnly}>
      <TbPremiumRights size="36"/> Данный контент доступен только по премиум подписке
    </div>
  )
}

export default PremiumOnly
