import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useFormik } from 'formik'
import { formatNetworkErrorMessages } from '../utils/format'
import Theme, { theme } from '../styles/Theme'
import { FullPageLayout } from '../layout/FullPageLayout'
import { device } from '../styles/config'
import { H1, Span } from '../styles/typography'
import { Input } from '../components/Input/Input'
import { CustomButton } from '../components/Button/Button'
import { CustomLabel } from '../components/Label/Label'
import { SigninSchema } from '../validation/Signin.validation'
import { SIGNUP_SUCCESS, SIGNUP_ERRORS } from '../utils/messages'
import { ToastsStore } from 'react-toasts'
import { Link } from 'react-router-dom'

export const Signin = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: ${(props) => props.theme.colors.lightPrimary};
  box-shadow: 2px 0px 15px rgba(0, 0, 0, 0.05);
  border-radius: ${(props) => props.theme.misc.borderRadius};
  min-width: 150px;
  min-height: 150px;
  width: 100%;
  height: 100%;
  max-width: 100%;
  overflow-x: hidden;
  font-family: ${(props) => props.theme.fonts[1]};
  @media ${device.laptop} {
    width: 512px;
    height: auto;
    max-width: 900px;
  }
`
const SigninContent = styled.div`
  width: 100%;
  padding: 48px 32px;
  h1 {
    padding-bottom: 24px;
  }
`

export const LOGIN = gql`
  mutation Login {
    login(email: "rivoltafilippo3@gmail.com", password: "Lampone01!") {
      token
      user {
        id
        email
      }
    }
  }
`

const SigninPage: React.FC = () => {
  const [signup, { loading, error }] = useMutation(LOGIN)
  //@ToDo: Check if a user is already logged in
  //@ToDo: On success redirect
  //@ToDo: Context
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    // validationSchema: Signin Schema,
    validationSchema: SigninSchema,
    onSubmit: async (values) => {
      try {
        await signup({
          variables: { email: values.email, password: values.password },
        })
        ToastsStore.success(SIGNUP_SUCCESS.success)
        formik.resetForm()
      } catch {
        ToastsStore.error(SIGNUP_ERRORS.genericError)
      }
    },
  })
  return (
    <Theme>
      <FullPageLayout>
        <Signin>
          <SigninContent>
            <H1 color={theme.colors.darkPrimary}>
              Fill out the form <br />
              and <Span>Sign In</Span>.
            </H1>
            <form onSubmit={formik.handleSubmit}>
              <Input
                name="email"
                placeholder="yourname@company.com"
                type="text"
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.email}
                label="Email"
                hasErrors={
                  formik.touched.email && formik.errors.email ? true : false
                }
                errorMessage={formik.errors.email}
              />
              <Input
                name="password"
                placeholder="password"
                type="password"
                label="Password"
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.password}
                hasErrors={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
                }
                errorMessage={formik.errors.password}
              />
              {error && (
                <CustomLabel type="error">
                  {formatNetworkErrorMessages(error.message)}
                </CustomLabel>
              )}
              <CustomButton
                text="Sign in"
                disabled={!formik.isValid || !formik.dirty || loading}
                margin="32px 0 16px 0"
                isLoading={loading}
                data-testid="SubmitButton"
              />
              <CustomLabel>
                Don&apos;t have an account yet? <a href="/signup">Sign up.</a>
              </CustomLabel>
            </form>
          </SigninContent>
        </Signin>
      </FullPageLayout>
    </Theme>
  )
}

export default SigninPage
