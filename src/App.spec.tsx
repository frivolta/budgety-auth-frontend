import '@testing-library/jest-dom'
import React from 'react'
import App from './App'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import { Route, Switch, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom/extend-expect'

import IndexPage from './pages/IndexPage'
import ErrorPage from './pages/ErrorPage'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import { AuthContext } from './context/auth/useAuth'

const DummyComponent: React.FC = () => {
  return <p data-testid="DummyComponent">Dummy</p>
}

describe('App', () => {
  it('renders without error', () => {
    render(<App />)
  })
})

describe('Routes', () => {
  it('renders the default path without errors', () => {
    const history = createMemoryHistory()
    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    )
    expect(container.innerHTML).toMatch('Index page')
  })

  it('shows a 404 page when landing on a bad page', () => {
    const history = createMemoryHistory({ initialEntries: ['/error'] })
    const { container } = render(
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    )
    expect(container.innerHTML).toMatch('Error page')
  })
  it('can navigate between routes', () => {
    const history = createMemoryHistory({ initialEntries: ['/error'] })
    const { container } = render(
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/dummyRoute" component={DummyComponent} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    )
    history.push('/dummyRoute')
    expect(container.innerHTML).toMatch('Dummy')
  })

  it('cannot visit private routes if not signed in', () => {
    const history = createMemoryHistory({ initialEntries: ['/error'] })
    const { container } = render(
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <PrivateRoute exact path="/dummyRoute" component={DummyComponent} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    )
    history.push('/dummyRoute')
    expect(container.innerHTML).toMatch('Error')
  })

  it('can visit private route if signed in', () => {
    const history = createMemoryHistory({ initialEntries: ['/error'] })
    const { container } = render(
      <AuthContext.Provider value={{ authTokens: 'auth token' }}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={IndexPage} />
            <PrivateRoute exact path="/dummyRoute" component={DummyComponent} />
            <Route component={ErrorPage} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    )
    history.push('/dummyRoute')
    expect(container.innerHTML).toMatch('Dummy')
  })
})
