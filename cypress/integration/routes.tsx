/// <reference types="cypress" />
import { testUser } from '../support/users'
import { NETWORK } from '../support/variables'
import { SIGNIN_REQUEST_SUCCESS } from '../support/requests'
import { uri } from '../../src/config/apolloClient'

/**
 *  - User cannot navigate to dashboard page if not signed in
 *  - User see 404 page if path does not exists
 *  - User can navigate to dashboard if he logs in
 */

describe('Routes', function () {
  this.beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit(`${NETWORK.LOCAL}/signin`, {
      onBeforeLoad: (win) => {
        win.fetch = null
      },
    })
  })

  it('redirects user to login page if he is not logged in', () => {
    cy.visit(`${NETWORK.LOCAL}/dashboard`, {
      onBeforeLoad: (win) => {
        win.fetch = null
      },
    })
    cy.location('pathname').should('eq', '/signin')
  })

  it('shows 404 if user land on 404 page', () => {
    cy.visit(`${NETWORK.LOCAL}/error`, {
      onBeforeLoad: (win) => {
        win.fetch = null
      },
    }).contains('Error page')
  })

  it('let user navigate to the dashboard if he is correctly signed in', () => {
    cy.visit(`${NETWORK.LOCAL}/signin`, {
      onBeforeLoad: (win) => {
        win.fetch = null
      },
    })
    cy.server()
    cy.route({
      url: uri,
      method: 'POST',
      status: 200,
      response: SIGNIN_REQUEST_SUCCESS,
      delay: 200,
    }).as('signin-request')
    cy.signinUser({ email: testUser.email, password: testUser.password })
    cy.wait('@signin-request').then((xhr) => {
      expect(xhr.status).to.equal(200)
      cy.visit(`${NETWORK.LOCAL}/dashboard`, {}).contains('Dashboard')
    })
  })
})
