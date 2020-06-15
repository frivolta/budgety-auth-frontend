import '@testing-library/jest-dom'
import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/react-testing'
import '@testing-library/jest-dom/extend-expect'
import SignupPage, { SIGNUP } from '../../pages/SignupPage'
import { SIGNUP_ERRORS } from '../../utils/messages'
import { AuthContext } from '../../context/auth/useAuth'

/**
 * 1) User can signup with right credentials
 *  - Type username
 *  - Type password
 *  - Button must be enabled
 *  - Click Signup
 *  - Loading is spinning
 *  - Intercepted api request
 *  - Intercepted succesful response
 *
 *  2) User triggers input errors
 */
const testUser = { email: 'test@user.com', password: 'Lampone02!' }
let signupMutationCalled = false
const mockSignupMutation = [
  {
    request: {
      query: SIGNUP,
      variables: {
        email: testUser.email,
        password: testUser.password,
      },
    },
    result: jest.fn(() => {
      signupMutationCalled = true
      return {
        data: {
          signup: {
            token: 'valid token',
          },
        },
      }
    }),
  },
]

const SignupComponent = () => {
  const getLocalStorageToken = (): string | null => {
    const tokens = localStorage.getItem('tokens')
    return tokens ? JSON.parse(tokens) : undefined
  }
  const [authTokens, setAuthTokens] = React.useState(getLocalStorageToken())

  const setTokens = (data: string) => {
    localStorage.setItem('tokens', JSON.stringify(data))
    setAuthTokens(data)
  }
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <MockedProvider mocks={mockSignupMutation} addTypename={false}>
        <SignupPage />
      </MockedProvider>
    </AuthContext.Provider>
  )
}

describe('<SignupPage />', () => {
  it('renders the component without errors', () => {
    const { container } = render(<SignupComponent />)
    expect(container.innerHTML).toMatch('Sign up')
  })

  it('let user signup with valid credentials', async () => {
    const { getByLabelText, getByTestId } = render(<SignupComponent />)
    const emailInput = getByLabelText('Email')
    const passwordInput = getByLabelText('Password')
    const confirmPasswordInput = getByLabelText('Confirm Password')
    const submitButton = getByTestId('CustomButton')

    expect(submitButton).toBeDisabled()
    expect(submitButton).toHaveTextContent('Sign up')

    // Type user credentials enabling signup button
    fireEvent.change(emailInput, { target: { value: testUser.email } })
    fireEvent.change(passwordInput, {
      target: { value: testUser.password },
    })
    fireEvent.change(confirmPasswordInput, {
      target: { value: testUser.password },
    })
    // User triggers mutation
    expect(submitButton).not.toBeDisabled()
    userEvent.click(submitButton)
    // Check if spinner is loaded when loading
    await waitFor(() => expect(getByTestId('Spinner')).toBeInTheDocument())
    // Expect the mutation return values
    await waitFor(() => expect(signupMutationCalled).toBe(true))
    await waitFor(() =>
      expect(mockSignupMutation[0].result).toHaveBeenCalledTimes(1)
    )
  })
  it('triggers errors for user not using right credentials', async () => {
    const { getByLabelText, getByTestId, getByText } = render(
      <SignupComponent />
    )
    const emailInput = getByLabelText('Email')
    const passwordInput = getByLabelText('Password')
    const confirmPasswordInput = getByLabelText('Confirm Password')
    const submitButton = getByTestId('CustomButton')

    expect(submitButton).toBeDisabled()
    expect(submitButton).toHaveTextContent('Sign up')

    // Type user invalid credentials
    await userEvent.type(emailInput, 'invalidemail')
    await userEvent.type(passwordInput, 'invpwd')
    await userEvent.type(confirmPasswordInput, 'invcfr')
    userEvent.tab()

    // User triggers errors
    expect(submitButton).toBeDisabled()
    expect(getByText(SIGNUP_ERRORS.invalidEmail)).toBeInTheDocument()
    expect(getByText(SIGNUP_ERRORS.invalidPassword)).toBeInTheDocument()
    expect(getByText(SIGNUP_ERRORS.passwordMatch)).toBeInTheDocument()
  })
})
