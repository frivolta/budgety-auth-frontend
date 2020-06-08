import React from 'react'
import { hot } from 'react-hot-loader'

// Apollo client / GraphQL
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from './config/apolloClient'

// React Router
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

// Pages
import { ErrorPage } from './pages/ErrorPage'
import { IndexPage } from './pages/IndexPage'

// @ToDo: Refactor routes to another component -> Stack overflow
const App: React.SFC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </ApolloProvider>
  )
}
export default hot(module)(App)
