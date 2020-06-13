import * as yup from 'yup'
import { SIGNUP_ERRORS } from '../utils/messages'
export const SignupSchema = yup.object().shape({
  email: yup
    .string()
    .email(SIGNUP_ERRORS.invalidEmail)
    .required(SIGNUP_ERRORS.required),
  password: yup
    .string()
    .required(SIGNUP_ERRORS.passwordRequired)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
      SIGNUP_ERRORS.invalidPassword
    ),
  confirmPassword: yup
    .string()
    .required(SIGNUP_ERRORS.confirmPasswordRequired)
    .oneOf([yup.ref('password')], SIGNUP_ERRORS.passwordMatch),
})
