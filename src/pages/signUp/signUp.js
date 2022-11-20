import React from "react";
import {Button, TextField} from "@mui/material";
import FormGroup from "../../components/Form/FormGroup";
import {useForm} from "react-hook-form";
import s from "./SignUp.module.scss"
import {yupResolver} from "@hookform/resolvers/yup";
import clsx from "clsx";
import {SignUpCompleteRegistrationSchema} from "../../app/validation/userValidation";
import FormHelperMessage from "../../components/Form/FormHelperMessage";
import {Controller} from "react-hook-form";
import {AuthService} from "../../app/services/AuthService";
import {Toast} from "../../app/utils/toast";
import {useUserContext} from "../../app/context/userContext";
import {useNavigate} from "react-router-dom";
import Layout from "../../components/Layout/Layout";

const SignUp = () => {
  const {formState, register, handleSubmit, control, setError, setValue, getValues} = useForm({
    mode: "onSubmit",
    resolver: yupResolver(SignUpCompleteRegistrationSchema)
  })
  const {errors, isSubmitting} = formState
  const {userInfo, updateUserInfo} = useUserContext()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    AuthService
      .signUp(data)
      .then(response => {
        updateUserInfo(response.data.user)
        localStorage.setItem(response.data.token.access_token)
        Toast.displaySuccessMessage("Вы успешно зарегистрировались в системе!")
        navigate('/')
      })
      .catch(err => console.log(err))
  }

  return (
    <Layout>
      <div className={clsx("container", s.main)}>

        <div className={s.form}>
          <h1 className={s.heading}>Регистрация</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Controller
                control={control}
                name="name"
                render={({field: {onChange, value}}) => (
                  <TextField
                    required
                    name="name"
                    value={value}
                    onChange={onChange}
                    error={errors.name?.message || false}
                    variant="outlined"
                    label="Полное имя"
                  />
                )}
              />
              <FormHelperMessage>{errors.name?.message}</FormHelperMessage>
            </FormGroup>

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

            <FormGroup>
              <Controller
                control={control}
                name="confirmPassword"
                render={({field: {onChange, value}}) => (
                  <TextField
                    required
                    name="confirmPassword"
                    type="password"
                    value={value}
                    onChange={onChange}
                    error={errors.confirmPassword?.message || false}
                    variant="outlined"
                    label="Подтверждение пароля"
                  />
                )}
              />
              <FormHelperMessage>{errors.confirmPassword?.message}</FormHelperMessage>
            </FormGroup>

            <Button
              disabled={isSubmitting}
              type="submit"
            >Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default SignUp
