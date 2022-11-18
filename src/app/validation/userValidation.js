import * as yup from "yup"

export const SignUpCompleteRegistrationSchema = yup.object().shape({
  name: yup.string().min(2).required(),
  email: yup.string().min(5).email().required(),
  password: yup.string()
    .min(8)
    .required("Пароль обязятелен к заполнению!"),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]).required()
})
