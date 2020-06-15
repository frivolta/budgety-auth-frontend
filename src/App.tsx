import React, { useState } from 'react'
import { hot } from 'react-hot-loader'

// Apollo client / GraphQL
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from './config/apolloClient'

// React Router
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

// Pages
import ErrorPage from './pages/ErrorPage'
import IndexPage from './pages/IndexPage'
import SignupPage from './pages/SignupPage'

// Toaster
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from 'react-toasts'
import SigninPage from './pages/SigninPage'
import { AuthContext } from './context/auth/useAuth'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

// @ToDo: Refactor routes to another component -> Stack overflow
const App: React.SFC = () => {
  const getLocalStorageToken = (): string | null => {
    const tokens = localStorage.getItem('tokens')
    return tokens ? JSON.parse(tokens) : undefined
  }
  const [authTokens, setAuthTokens] = useState(getLocalStorageToken())

  const setTokens = (data: string) => {
    localStorage.setItem('tokens', JSON.stringify(data))
    setAuthTokens(data)
  }
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <ApolloProvider client={client}>
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_RIGHT}
        />
        <Router>
          <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/signin" component={SigninPage} />
            <PrivateRoute exact path="/dashboard" component={IndexPage} />
            <Route component={ErrorPage} />
          </Switch>
        </Router>
      </ApolloProvider>
    </AuthContext.Provider>
  )
}
export default hot(module)(App)
