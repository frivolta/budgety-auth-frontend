import React from 'react'
import { Route } from 'react-router-dom'
import { Redirect, RouteProps } from 'react-router-dom'
import { useAuth } from '../../context/auth/useAuth'

interface PrivateRouteProps extends RouteProps {
  component: any
}

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const isAuthenticated: any = useAuth()
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && isAuthenticated.authTokens ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  )
}

export default PrivateRoute
