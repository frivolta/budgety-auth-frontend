import * as yup from 'yup'

export enum SIGNUP_ERRORS {
  required = 'Required',
  invalidEmail = 'Email not valid',
  invalidPassword = 'Password not strong enough',
  passwordRequired = 'Please enter your password',
  confirmPasswordRequired = 'Please confirm your password',
  passwordMatch = 'Passwords must match',
}

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
