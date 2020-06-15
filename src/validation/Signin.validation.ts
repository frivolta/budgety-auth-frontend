import * as yup from 'yup'
import { SIGNIN_ERRORS } from '../utils/messages'
export const SigninSchema = yup.object().shape({
  email: yup.string().required(SIGNIN_ERRORS.required),
  password: yup.string().required(SIGNIN_ERRORS.required),
})
