import React, {useState} from "react";
import {Alert} from "@mui/material";
import {useForm} from "react-hook-form";
import {Button, Form} from "react-bootstrap";
import s from "./SignUp.module.scss"
import {yupResolver} from "@hookform/resolvers/yup";
import clsx from "clsx";
import {SignUpCompleteRegistrationSchema} from "../../app/validation/userValidation";
import FormHelperMessage from "../../components/Form/FormHelperMessage";
import {Controller} from "react-hook-form";
import {AuthService} from "../../app/services/AuthService";
import {Toast} from "../../app/utils/toast";
import {useUserContext} from "../../app/context/userContext";
import {Link, useNavigate} from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import {MdOutlineWorkspacePremium, MdOutlineFamilyRestroom, MdOutlineMovie} from "react-icons/md";

const SignUp = () => {
  const {formState, register, handleSubmit, control, setError, setValue, getValues} = useForm({
    mode: "onSubmit",
    resolver: yupResolver(SignUpCompleteRegistrationSchema)
  })
  const {errors, isSubmitting} = formState
  const {userInfo, updateUserInfo} = useUserContext()
  const navigate = useNavigate()
  const [errorText, setErrorText] = useState("")
  const [activeSubscription, setActiveSubscription] = useState(1)

  const onSubmit = async (data) => {
    AuthService
      .signUp({...data, subscription: activeSubscription})
      .then(response => {
        updateUserInfo(response.data.user)
        localStorage.setItem('auth_token', response.data.token.access_token)
        Toast.displaySuccessMessage("Вы успешно зарегистрировались в системе!")
        navigate('/')
      })
      .catch(err => {
        if (err.response.status === 401) {
          setErrorText("Данный пользователь уже существует в системе!")
        }
      })
  }
  console.log(errors)
  return (
    <Layout disableHeader hasAuthBg disableContainerStyles>
      <div>
        <div className={clsx("container", s.main)}>
          <div className={s.form}>
            <img className={s.logo} src="/var1.svg" alt=""/>
            <h1 className={s.heading}>Регистрация</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="controlName" className="mb-3">
                <Controller
                  control={control}
                  name="name"
                  render={({field: {onChange, value}}) => (
                    <Form.Control
                      isInvalid={errors.name?.message}
                      name="name"
                      value={value}
                      onChange={onChange}
                      placeholder="Полное имя"
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="controlEmail" className="mb-3">
                <Controller
                  control={control}
                  name="email"
                  render={({field: {onChange, value}}) => (
                    <Form.Control
                      name="email"
                      type="email"
                      value={value}
                      onChange={onChange}
                      placeholder="Электронная почта"
                      isInvalid={errors.email?.message}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="controlPassword" className="mb-3">
                <Controller
                  control={control}
                  name="password"
                  render={({field: {onChange, value}}) => (
                    <Form.Control
                      type="password"
                      name="password"
                      value={value}
                      onChange={onChange}
                      placeholder="Пароль"
                      isInvalid={errors.password?.message}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="controlPassword" className="mb-3">
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({field: {onChange, value}}) => (
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={value}
                      onChange={onChange}
                      placeholder="Подтверждение пароля"
                      isInvalid={errors.confirmPassword?.message}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <h6>Выберите подписку</h6>

                <div className={clsx(s.subscriptionItem, {[s.active]: activeSubscription === 1})} onClick={() => setActiveSubscription(1)}>
                  <div>
                    <MdOutlineMovie size={48}/>
                  </div>
                  <div className={s.content}>
                    Бесплатная
                    <small>Премиум фильмы и плейлисты будут недоступны</small>
                  </div>
                </div>

                <div className={clsx(s.subscriptionItem, {[s.active]: activeSubscription === 2})} onClick={() => setActiveSubscription(2)}>
                  <div>
                    <MdOutlineWorkspacePremium size={48}/>
                  </div>
                  <div className={s.content}>
                    Личная
                    <small>Доступ ко всем платным функциям</small>
                  </div>
                </div>

                <div className={clsx(s.subscriptionItem, {[s.active]: activeSubscription === 3})} onClick={() => setActiveSubscription(3)}>
                  <div>
                    <MdOutlineFamilyRestroom size={48}/>
                  </div>
                  <div className={s.content}>
                    Семейная
                    <small>Можете подключить до 5-ти человек в подписку</small>
                  </div>
                </div>
              </Form.Group>

              {errorText && (
                <Alert sx={{marginY: "0.5rem"}} severity="error">{errorText}</Alert>
              )}
              <div className="d-grid gap-2">
                <Button
                  variant="warning"
                  disabled={isSubmitting}
                  type="submit"
                >Зарегистрироваться
                </Button>
                <Link className="w-100" to='/sign_in'>
                  <Button
                    className="w-100"
                    variant="outline-secondary"
                    disabled={isSubmitting}
                  >
                    Войти в аккаунт
                  </Button>
                </Link>
              </div>

            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SignUp
