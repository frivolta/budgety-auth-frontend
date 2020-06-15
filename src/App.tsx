import React from 'react'
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

// @ToDo: Refactor routes to another component -> Stack overflow
const App: React.SFC = () => {
  return (
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
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </ApolloProvider>
  )
}
export default hot(module)(App)
