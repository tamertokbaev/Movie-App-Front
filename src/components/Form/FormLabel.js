import React from "react";
import {FormLabel as MuiFormLabel} from "@mui/material";
import styles from "./styles.module.scss"

const FormLabel= ({children}) => {

  return (
    <MuiFormLabel className={styles.formLabel}>
      {children}
    </MuiFormLabel>
  )
}

export default FormLabel
