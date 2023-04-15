import React, {useState} from "react";
import {useForm} from "react-hook-form";
import s from "./SignIn.module.scss"
import {yupResolver} from "@hookform/resolvers/yup";
import clsx from "clsx";
import {SignInCompleteSchema} from "../../app/validation/userValidation";
import FormHelperMessage from "../../components/Form/FormHelperMessage";
import {Controller} from "react-hook-form";
import {AuthService} from "../../app/services/AuthService";
import {useUserContext} from "../../app/context/userContext";
import {Link, useNavigate} from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import {Alert, Button, Form} from "react-bootstrap";

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
    <Layout disableHeader hasAuthBg disableContainerStyles>
      <div>
        <div
          className={clsx("container", s.main)}>

          <div className={s.form}>
            <img className={s.logo} src="/var1.svg" alt=""/>
            <h1 className={s.heading}>Login or Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="controlEmail" className="mb-3">
                <Controller
                  control={control}
                  name="email"
                  render={({field: {onChange, value}}) => (
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={value}
                      onChange={onChange}
                      isInvalid={errors?.email?.message}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.email?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="controlPassword" className="mb-3">
                <Controller
                  control={control}
                  name="password"
                  render={({field: {onChange, value}}) => (
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={value}
                      onChange={onChange}
                      isInvalid={errors?.password?.message}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.password?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Alert show={!!errorText} className="mt-2" variant="danger">{errorText}</Alert>
              <div className="d-grid gap-2">
                <Button
                  variant="warning"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Loading..." : "Sign In"}
                </Button>
                <Link className="w-100" to='/sign_up'>
                  <Button
                    className="w-100"
                    variant="outline-secondary"
                    disabled={isSubmitting}
                  >
                    Sign up
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
