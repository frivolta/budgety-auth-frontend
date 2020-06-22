// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

type testUser = {
  email: string
  password: string
}

export const signupUser = (user: testUser) => {
  // Fill fields and click signup button
  cy.get('input[name="email"]').click().type(user.email)
  cy.get('input[name="password"]').click().type(user.password)
  cy.get('input[name="confirmPassword"]').click().type(user.password)
  cy.get('button').contains('Sign up').click()
}
Cypress.Commands.add('signupUser', signupUser)

export const signinUser = (user: testUser) => {
  // Fill fields and click signup button
  cy.get('input[name="email"]').click().type(user.email)
  cy.get('input[name="password"]').click().type(user.password)
  cy.get('button').contains('Sign in').click()
}
Cypress.Commands.add('signinUser', signinUser)
