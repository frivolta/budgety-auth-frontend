/// <reference types="cypress" />
import { testUser } from '../support/users'
import { NETWORK } from '../support/variables'
import { SIGNUP_ERRORS } from '../../src/utils/messages'
import {
  SIGNUP_REQUEST_REJECTED,
  SIGNUP_REQUEST_SUCCESS,
} from '../support/requests'
import { SIGNUP_SUCCESS } from '../../src/utils/messages'
import { uri } from '../../src/config/apolloClient'
import 'cypress-localstorage-commands'

/**
 *  1) User get validation visual errors
 *  - Type username
 *  - Type password
 *  - Button must be enabled
 *  - Click Signup
 *  - Throws an error password is not secure
 *  - Throws an error password is not not matching
 *  - Throws an error if required fileds are empty
 *  - Shows enabled button if all fields are correctly filled
 *  - Throws error if email is already present
 *  - Gets redirected if correctly sign up
 *  - Can navigate to signin page
 */

describe('Signup Ui', function () {
  this.beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit(`${NETWORK.LOCAL}/signup`, {
      onBeforeLoad: (win) => {
        win.fetch = null
      },
    }).contains('Sign up')
  })

  it('correctly shows fields and disabled button', () => {
    cy.get('input[name="email"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('input[name="confirmPassword"]').should('be.visible')
    cy.get('button').should('be.disabled')
  })

  it("shows error if password don't match", () => {
    cy.get('input[name="password"]').click().type('Pa$$word1!')
    cy.get('input[name="confirmPassword"]').click().type('DifferentPa$$word1!')
    cy.get('input[name="email"]').click()
    cy.contains(SIGNUP_ERRORS.passwordMatch).should('be.visible')
    cy.get('button').should('be.disabled')
  })

  it('shows error if password not strong enough', () => {
    cy.get('input[name="password"]').click().type('password')
    cy.get('input[name="confirmPassword"]').click().type('password')
    cy.contains(SIGNUP_ERRORS.invalidPassword).should('be.visible')
    cy.get('button').should('be.disabled')
  })

  it('shows error invalid email', () => {
    cy.get('input[name="email"]').click().type('invalid-email.com')
    cy.get('input[name="password"]').click()
    cy.contains(SIGNUP_ERRORS.invalidEmail).should('be.visible')
    cy.get('button').should('be.disabled')
  })
  it('shows enabled button if fields are filled correctly ', () => {
    cy.get('input[name="email"]').click().type(testUser.email)
    cy.get('input[name="password"]').click().type(testUser.password)
    cy.get('input[name="confirmPassword"]').click().type(testUser.password)
    cy.get('button').should('be.enabled')
  })
})

describe('Signup requests', function () {
  this.beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit(`${NETWORK.LOCAL}/signup`, {
      onBeforeLoad: (win) => {
        win.fetch = null
      },
    }).contains('Sign up')
  })
  it('rejects user creation if email is already present ', () => {
    // Stub rejection server
    cy.server()
    cy.route({
      url: uri,
      method: 'POST',
      status: 200,
      response: SIGNUP_REQUEST_REJECTED,
      delay: 200,
    }).as('signup-reject')

    cy.signupUser({ email: testUser.email, password: testUser.password })

    // Wait for server response
    cy.wait('@signup-reject').then((xhr) => {
      expect(xhr.status).to.equal(200)
      cy.get('form').contains(SIGNUP_REQUEST_REJECTED.errors[0].message)
      cy.get('.toasts-container')
        .contains(SIGNUP_ERRORS.genericError)
        .should('be.visible')
    })
  })

  it('correctly signup user if email is not present', () => {
    // Stub rejection server
    cy.server()
    cy.route({
      url: uri,
      method: 'POST',
      status: 200,
      response: SIGNUP_REQUEST_SUCCESS,
      delay: 200,
    }).as('signup-request')

    cy.signupUser({ email: testUser.email, password: testUser.password })

    // Wait for server response
    cy.wait('@signup-request').then((xhr) => {
      expect(xhr.status).to.equal(200)
      cy.get('.toasts-container')
        .contains(SIGNUP_SUCCESS.success)
        .should('be.visible')
    })
  })
})

describe('Signup links', function () {
  this.beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit(`${NETWORK.LOCAL}/signup`, {
      onBeforeLoad: (win) => {
        win.fetch = null
      },
    }).contains('Sign up')
  })

  it('can navigate to signin page', () => {
    cy.get('a').contains('Sign in').click() // Check if path
    cy.location('pathname').should('eq', '/signin')
  })
})
