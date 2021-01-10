/// <reference types="cypress" />

describe('Movie database', () => {
  it('starts with an empty list', () => {
    cy.request('/persons').its('body').should('deep.equal', [])
  })
})
