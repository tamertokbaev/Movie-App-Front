import React, {useState} from "react";
import {Alert, Button, TextField} from "@mui/material";
import FormGroup from "../../components/Form/FormGroup";
import {useForm} from "react-hook-form";
import s from "./SignIn.module.scss"
import {yupResolver} from "@hookform/resolvers/yup";
import clsx from "clsx";
import {SignInCompleteSchema} from "../../app/validation/userValidation";
import FormHelperMessage from "../../components/Form/FormHelperMessage";
import {Controller} from "react-hook-form";
import {AuthService} from "../../app/services/AuthService";
import {useUserContext} from "../../app/context/userContext";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

const SignUp = () => {
  const {formState, handleSubmit, control} = useForm({
    mode: "onSubmit",
    resolver: yupResolver(SignInCompleteSchema)
  })
  const {errors, isSubmitting} = formState
  const {userInfo, updateUserInfo} = useUserContext()
  const [errorText, setErrorText] = useState("")
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    AuthService
      .signIn(data)
      .then(response => {
        localStorage.setItem('auth_token', response.data.token.access_token)
        updateUserInfo(response.data.user)
        navigate('/')
      })
      .catch(err => {
        if (err.response.status === 401) {
          setErrorText("Неверное имя пользователя либо пароль!")
        } else {
          setErrorText("Ошибка на сервере!")
        }
      })
  }

  return (
    <Layout disableContainerStyles>
      <div
        style={{background: "url('/auth_bg.jpeg')", backgroundSize: "cover"}}
      >
        <div
          className={clsx("container", s.main)}>

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
              {errorText && (
                <Alert sx={{marginY: "0.5rem"}} severity="error">{errorText}</Alert>
              )}
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
    </Layout>
  )
}

export default SignUp
