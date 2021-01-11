/// <reference types="cypress" />

describe('Matt Damon', () => {
  it('has family', () => {
    // the database already has the initial family for Matt Damon
    cy.request('/persons').its('body').should('have.length', 3)
  })
})
