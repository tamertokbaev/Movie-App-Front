import * as yup from "yup"

export const SignInCompleteSchema = yup.object().shape({
  email: yup.string()
    .email("Данное значение не является электронным адресом!")
    .required("Почта обязательна к заполнению"),
  password: yup.string()
    .min(8, "Длина пароля должна быть минимум из 8-ми символов!")
    .required("Пароль обязятелен к заполнению!")
})

export const SignUpCompleteRegistrationSchema = yup.object().shape({
  name: yup.string().required("Полное имя обязательно к заполнению"),
  email: yup.string().email().required("Почта обязательна к заполнению"),
  password: yup.string()
    .min(8, "Длина пароля должна быть минимум из 8-ми символов!")
    .required("Пароль обязятелен к заполнению!"),
  confirmPassword:
    yup
      .string()
      .oneOf([yup.ref('password'), null], "Пароли должны совпадать!")
      .required("Вы должен заполнить подтверждение к паролю!")
})
