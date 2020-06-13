/// <reference types="cypress" />
import { testUser } from '../../support/users'
import { NETWORK } from '../../support/variables'
import { SIGNUP_ERRORS } from '../../../src/utils/messages'
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
 */
describe('Signup', function () {
  this.beforeEach(() => {
    cy.visit(`${NETWORK.LOCAL}/signup`).contains('Sign up')
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
