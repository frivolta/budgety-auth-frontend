import React from 'react'
import { hot } from 'react-hot-loader'

// Apollo client / GraphQL
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from './config/apolloClient'

const App: React.SFC = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Hello World.</h1>
      </div>
    </ApolloProvider>
  )
}
export default hot(module)(App)
