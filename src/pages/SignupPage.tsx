import React from 'react'
import { Link } from '@reach/router'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useFormik } from 'formik'

import Theme, { theme } from '../styles/Theme'
import { FullPageLayout } from '../layout/FullPageLayout'
import { device } from '../styles/config'
import { H1, Span } from '../styles/typography'
import { Input } from '../components/Input/Input'
import { CustomButton } from '../components/Button/Button'
import { CustomLabel } from '../components/Label/Label'
import { SignupSchema } from '../validation/Signup.validation'

export const SignupCard = styled.div`
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
const SignupCardContent = styled.div`
  width: 100%;
  padding: 48px 32px;
  h1 {
    padding: 24px 0;
  }
`

export const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
    }
  }
`

export const SignupPage: React.FC = () => {
  const [signup, { loading, error, data }] = useMutation(SIGNUP)
  //@ToDo: Unit testing
  //@ToDo: Adding labels
  //@ToDo: Page overflow
  //@ToDo: Send GraphQL
  //@ToDo: Manage GraphQL errors
  //@ToDo: Manage GraphQL success
  //@ToDo: Integration testing
  //@ToDo: Context
  //@ToDo: Integration testing
  //@ToDo: E2E

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  if (data) console.log(data)

  return (
    <Theme>
      <FullPageLayout>
        <SignupCard>
          <SignupCardContent>
            <H1 color={theme.colors.darkPrimary}>
              Fill out the form <br />
              and <Span>Sign Up</Span>.
            </H1>
            <form onSubmit={formik.handleSubmit}>
              <Input
                name="email"
                placeholder="E-mail"
                type="text"
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.email}
                hasErrors={
                  formik.touched.email && formik.errors.email ? true : false
                }
                errorMessage={formik.errors.email}
              />
              <Input
                name="password"
                placeholder="password"
                type="password"
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
              <Input
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                hasErrors={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? true
                    : false
                }
                errorMessage={formik.errors.confirmPassword}
              />
              <CustomButton
                text="Sign up"
                disabled={!formik.isValid || !formik.dirty}
              />
              <CustomLabel>
                Already have an account? <Link to="/signin">Sign in.</Link>
              </CustomLabel>
            </form>
          </SignupCardContent>
        </SignupCard>
      </FullPageLayout>
    </Theme>
  )
}
