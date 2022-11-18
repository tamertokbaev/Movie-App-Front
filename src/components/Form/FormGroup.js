import React from "react";
import {FormGroup as MuiFormGroup} from "@mui/material";
import styles from "./styles.module.scss"
import clsx from "clsx";

const FormGroup = (props) => {
  const {children, className} = props

  return (
    <MuiFormGroup className={clsx(styles.formGroup, className)}>
      {children}
    </MuiFormGroup>
  )
}

export default FormGroup
