/// <reference types="cypress" />
import { testUser } from '../support/users'
import { NETWORK } from '../support/variables'
import { SIGNUP_ERRORS } from '../../src/utils/messages'
import { SIGNUP } from '../../src/pages/SignupPage'
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

const failResp = {
  data: null,
  errors: [
    {
      message: 'na',
      locations: [{ line: 2, column: 3 }],
      path: ['signup'],
      code: 3010,
      requestId: 'local:ckbjwtmld00200739vgpfo3oe',
    },
  ],
}
describe('Signup', function () {
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
  it('shows enabled button if fields are filled correctly ', () => {
    cy.server()
    cy.route({
      url: 'https://auth-prisma-dev.herokuapp.com/',
      method: 'POST',
      status: 200,
      response: failResp,
      delay: 1000,
    }).as('signup-reject')
    cy.get('input[name="email"]').click().clear().type(testUser.email)
    cy.get('input[name="password"]').click().clear().type(testUser.password)
    cy.get('input[name="confirmPassword"]')
      .click()
      .clear()
      .type(testUser.password)
    cy.get('button').should('be.enabled').click()

    cy.wait('@signup-reject').then((xhr) => {
      console.log(xhr)
      expect(xhr.status).to.equal(200)
    })
  })
})

// User signup request
// User signup rejected
// Can navigate to signin page
// Is redirected if token already present
// Intercept toaster
// Same tests with rtl
