import React from 'react'
import { Link } from '@reach/router'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import Theme, { theme } from '../styles/Theme'
import { FullPageLayout } from '../layout/FullPageLayout'
import { device } from '../styles/config'
import { H1, Span } from '../styles/typography'
import { Input } from '../components/Input/Input'
import { CustomButton } from '../components/Button/Button'
import { CustomLabel } from '../components/Label/Label'

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
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [signup, { loading, error, data }] = useMutation(SIGNUP)

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    switch (event.target.name) {
      case 'email':
        setEmail(event.target.value)
        break
      case 'password':
        setPassword(event.target.value)
        break
      default:
        break
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('call api' + email + password)
    signup({ variables: { email: email, password: password } })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  if (data) console.log(data)

  return (
    <Theme>
      <FullPageLayout>
        <SignupCard>
          <SignupCardContent>
            <div className="page" role="main">
              <div className="SignupContainer" data-testid="SignupContainer">
                <div className="Card">
                  <H1 color={theme.colors.darkPrimary}>
                    Fill out the form <br />
                    and <Span>Sign Up</Span>.
                  </H1>
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <Input
                      name="email"
                      placeholder="E-mail"
                      type="text"
                      value={email}
                      handleChange={(event) => handleInputChange(event)}
                    />
                    <Input
                      name="password"
                      placeholder="password"
                      type="password"
                      value={password}
                      handleChange={(event) => handleInputChange(event)}
                      hasErrors
                      errorMessage="test"
                    />
                    <CustomButton text="Sign up" />
                    <CustomLabel>
                      Already have an account?{' '}
                      <Link to="/signin">Sign in.</Link>
                    </CustomLabel>
                  </form>
                </div>
              </div>
            </div>
          </SignupCardContent>
        </SignupCard>
      </FullPageLayout>
    </Theme>
  )
}
