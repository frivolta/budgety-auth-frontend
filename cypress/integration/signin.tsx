/// <reference types="cypress" />
import { testUser } from '../support/users'
import { NETWORK } from '../support/variables'
import { SIGNIN_ERRORS, SIGNIN_SUCCESS } from '../../src/utils/messages'
import 'cypress-localstorage-commands'
import { uri } from '../../src/config/apolloClient'
import {
  SIGNIN_REQUEST_REJECT,
  SIGNIN_REQUEST_SUCCESS,
} from '../support/requests'

/**
 *  1) User get validation visual errors
 *  - Type username
 *  - Type password
 *  - Button must be enabled
 *  - Click Signin
 *  - Throws an error if required fileds are empty
 *  - Shows enabled button if all fields are correctly filled
 *  - Throws error if invalid credentials
 *  - Gets redirected if correctly sign in
 *  - Can navigate to signup
 */

describe('Signin Ui', function () {
  this.beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit(`${NETWORK.LOCAL}/signin`, {
      onBeforeLoad: (win) => {
        win.fetch = null
      },
    }).contains('Sign in')
  })

  it('correctly shows fields and disabled button', () => {
    cy.get('input[name="email"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('button').should('be.disabled')
  })

  it('shows error if missing required field', () => {
    cy.get('input[name="email"]').click().type(testUser.email).clear().blur()
    cy.get('input[name="password"]')
      .click()
      .type(testUser.password)
      .clear()
      .blur()
    cy.get('button').should('be.disabled')
    cy.get('[data-testid=InputError]')
      .eq(0)
      .should('contain', SIGNIN_ERRORS.required)
    cy.get('[data-testid=InputError]')
      .eq(1)
      .should('contain', SIGNIN_ERRORS.required)
  })

  it('shows enabled button if fields are filled correctly ', () => {
    cy.get('input[name="email"]').click().type(testUser.email)
    cy.get('input[name="password"]').click().type(testUser.password)
    cy.get('button').should('be.enabled')
  })
})

describe('Signin requests', function () {
  this.beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit(`${NETWORK.LOCAL}/signin`, {
      onBeforeLoad: (win) => {
        win.fetch = null
      },
    }).contains('Sign in')
  })

  it('rejects user login if user email does not exists', () => {
    // Stub rejection server
    cy.server()
    cy.route({
      url: uri,
      method: 'POST',
      status: 200,
      response: SIGNIN_REQUEST_REJECT,
      delay: 200,
    }).as('signin-reject')

    cy.signinUser({ email: testUser.email, password: testUser.password })

    // Wait for server response
    cy.wait('@signin-reject').then((xhr) => {
      expect(xhr.status).to.equal(200)
      cy.get('form').contains(SIGNIN_REQUEST_REJECT.errors[0].message)
      cy.get('.Toastify__toast')
        .contains(SIGNIN_ERRORS.genericError)
        .should('be.visible')
    })
  })

  it('correctly sign in user if valid email and password', () => {
    // Stub rejection server
    cy.server()
    cy.route({
      url: uri,
      method: 'POST',
      status: 200,
      response: SIGNIN_REQUEST_SUCCESS,
      delay: 200,
    }).as('signin-request')

    cy.signinUser({ email: testUser.email, password: testUser.password })

    // Wait for server response
    cy.wait('@signin-request').then((xhr) => {
      expect(xhr.status).to.equal(200)
      cy.get('.Toastify__toast')
        .contains(SIGNIN_SUCCESS.success)
        .should('be.visible')
      cy.location('pathname').should('not.eq', '/signin')
    })
  })
})

describe('Signin links', function () {
  this.beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit(`${NETWORK.LOCAL}/signin`, {
      onBeforeLoad: (win) => {
        win.fetch = null
      },
    }).contains('Sign in')
  })

  it('can navigate to signup page', () => {
    cy.get('a').contains('Sign up').click() // Check if path
    cy.location('pathname').should('eq', '/signup')
  })
})
