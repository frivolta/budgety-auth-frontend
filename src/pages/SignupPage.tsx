import React from 'react'
import { Link } from '@reach/router'

import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const SIGNUP = gql`
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
    <div className="page" role="main">
      <h1>Signup page</h1>
      <div className="SignupContainer" data-testid="SignupContainer">
        <div className="Card">
          <h1>
            Fill out the form <br />
            and Sign Up.
          </h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              name="email"
              placeholder="E-mail"
              type="text"
              value={email}
              onChange={(event) => handleInputChange(event)}
            />
            <input
              name="password"
              placeholder="password"
              type="password"
              value={password}
              onChange={(event) => handleInputChange(event)}
            />
            <button>Sign up</button>

            <p>
              Already have an account? <Link to="/signin">Sign in.</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
