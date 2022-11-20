import React from "react";
import {Button, TextField} from "@mui/material";
import FormGroup from "../../components/Form/FormGroup";
import {useForm} from "react-hook-form";
import s from "./SignIn.module.scss"
import {yupResolver} from "@hookform/resolvers/yup";
import clsx from "clsx";
import {SignInCompleteSchema} from "../../app/validation/userValidation";
import FormHelperMessage from "../../components/Form/FormHelperMessage";
import {Controller} from "react-hook-form";
import {AuthService} from "../../app/services/AuthService";

const SignUp = () => {
  const {formState, handleSubmit, control} = useForm({
    mode: "onSubmit",
    resolver: yupResolver(SignInCompleteSchema)
  })
  const {errors, isSubmitting} = formState

  const onSubmit = async (data) => {
    AuthService
      .signIn(data)
      .then(response => {
        console.log("success", response.data)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={s.layout}>
      <div className={clsx("container", s.main)}>

        <div className={s.form}>
          <h1 className={s.heading}>Вход в систему</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Controller
                control={control}
                name="email"
                render={({field: {onChange, value}}) => (
                  <TextField
                    required
                    name="email"
                    type="email"
                    value={value}
                    onChange={onChange}
                    error={errors.email?.message || false}
                    variant="outlined"
                    label="Электронная почта"
                  />
                )}
              />
              <FormHelperMessage>{errors.email?.message}</FormHelperMessage>
            </FormGroup>

            <FormGroup>
              <Controller
                control={control}
                name="password"
                render={({field: {onChange, value}}) => (
                  <TextField
                    required
                    name="password"
                    type="password"
                    value={value}
                    onChange={onChange}
                    error={errors.password?.message || false}
                    variant="outlined"
                    label="Пароль"
                  />
                )}
              />
              <FormHelperMessage>{errors.password?.message}</FormHelperMessage>
            </FormGroup>
            <Button
              disabled={isSubmitting}
              type="submit"
            >
              Войти
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
