import React from "react";
import {Button, TextField, Typography} from "@mui/material";
import FormGroup from "../../components/Form/FormGroup";
import {useForm} from "react-hook-form";
import s from "./SignUp.module.scss"
import clsx from "clsx";

const SignUp = () => {
  const {formState, register, handleSubmit, control, setError, setValue} = useForm({
    mode: "onSubmit"
  })
  const {errors, isSubmitting} = formState

  const onSubmit = async (data) => {

  }

    return (
    <div className={clsx("container", s.main)}>

      <div className={s.form}>
        <h1 className={s.heading}>Регистрация</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <TextField
              variant="outlined"
              label="Полное имя"
            />
          </FormGroup>

          <FormGroup>
            <TextField
              variant="outlined"
              label="Электронная почта"
            />
          </FormGroup>

          <FormGroup>
            <TextField
              variant="outlined"
              label="Пароль"
              type="password"
            />
          </FormGroup>

          <FormGroup>
            <TextField
              variant="outlined"
              label="Повторите пароль"
              type="password"
            />
          </FormGroup>

          <Button
            type="submit"
          >Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
