import '@testing-library/jest-dom'
import React from 'react'
import App from './App'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import { Route, Switch, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom/extend-expect'

import { IndexPage } from './pages/IndexPage'
import { ErrorPage } from './pages/ErrorPage'

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
})
