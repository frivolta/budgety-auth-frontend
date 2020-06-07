import React from 'react'
import { hot } from 'react-hot-loader'

// Apollo client / GraphQL
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const client = new ApolloClient({
  uri: 'https://auth-prisma-dev.herokuapp.com/',
})

// Test mutation on server -> To Remove
client
  .mutate({
    mutation: gql`
      mutation Signup($email: String!, $password: String!) {
        signup(email: $email, password: $password) {
          token
        }
      }
    `,
    variables: {
      email: 'test@test.it',
      password: 'Lampone01!',
    },
  })
  .then((res: any) => console.log(res))
// ./ Test mutation

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
