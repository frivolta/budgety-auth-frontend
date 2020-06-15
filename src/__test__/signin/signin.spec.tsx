import '@testing-library/jest-dom'
import React from 'react'
import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/react-testing'
import '@testing-library/jest-dom/extend-expect'
import SigninPage, { LOGIN } from '../../pages/SigninPage'
import { SIGNIN_ERRORS } from '../../utils/messages'

/**
 * 1) User can signup with right credentials
 *  - Type username
 *  - Type password
 *  - Button must be enabled
 *  - Click Signin
 *  - Loading is spinning
 *  - Intercepted api request
 *  - Intercepted succesful response
 *
 *  2) User triggers input errors
 */
const testUser = { email: 'test@user.com', password: 'Lampone02!' }
let signinMutationCalled = false
const mockSigninMutation = [
  {
    request: {
      query: LOGIN,
      variables: {
        email: testUser.email,
        password: testUser.password,
      },
    },
    result: jest.fn(() => {
      signinMutationCalled = true
      return {
        data: {
          login: {
            token: 'valid token',
            user: {
              id: 'valid id',
              email: testUser.email,
            },
          },
        },
      }
    }),
  },
]

const SigninComponent = () => (
  <MockedProvider mocks={mockSigninMutation} addTypename={false}>
    <SigninPage />
  </MockedProvider>
)

describe('<SigninPage />', () => {
  it('renders the component without errors', () => {
    const { container } = render(<SigninComponent />)
    expect(container.innerHTML).toMatch('Sign In')
  })

  it('let user signup with valid credentials', async () => {
    const { getByLabelText, getByTestId } = render(<SigninComponent />)
    const emailInput = getByLabelText('Email')
    const passwordInput = getByLabelText('Password')
    const submitButton = getByTestId('CustomButton')

    expect(submitButton).toBeDisabled()
    expect(submitButton).toHaveTextContent('Sign in')

    // Type user credentials enabling signup button
    await userEvent.type(emailInput, testUser.email)
    await userEvent.type(passwordInput, testUser.password)
    // User triggers mutation
    expect(submitButton).not.toBeDisabled()
    userEvent.click(submitButton)
    // Check if spinner is loaded when loading
    await waitFor(() => expect(getByTestId('Spinner')).toBeInTheDocument())
    // Expect the mutation return values
    await waitFor(() => expect(signinMutationCalled).toBe(true))
    await waitFor(() =>
      expect(mockSigninMutation[0].result).toHaveBeenCalledTimes(1)
    )
  })
  it('triggers errors for user not using right credentials', async () => {
    const { getByLabelText, getByTestId, queryAllByText } = render(
      <SigninComponent />
    )
    const emailInput = getByLabelText('Email')
    const passwordInput = getByLabelText('Password')
    const submitButton = getByTestId('CustomButton')

    expect(submitButton).toBeDisabled()
    expect(submitButton).toHaveTextContent('Sign in')

    // Type user invalid credentials
    await userEvent.type(emailInput, '')
    await userEvent.type(passwordInput, '')
    userEvent.tab()

    // User triggers errors
    expect(submitButton).toBeDisabled()
    expect(queryAllByText(SIGNIN_ERRORS.required)).toHaveLength(2)
  })
})
