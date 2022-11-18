import React from "react";
import {FormHelperText} from "@mui/material";

const FormHelperMessage = ({error, children}) => {

  return (
    <FormHelperText error={error ?? true}>{children}</FormHelperText>
  )
}

export default FormHelperMessage
