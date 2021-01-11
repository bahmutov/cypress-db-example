/// <reference types="cypress" />

describe('Movie database', () => {
  beforeEach(() => {
    cy.task('resetPeopleTable')
  })

  it('starts with an empty list', () => {
    cy.request('/persons').its('body').should('deep.equal', [])
  })

  it('adds an actor without any movies', () => {
    cy.request('POST', '/persons', {
      firstName: 'Joe',
      lastName: 'Smith',
    })
    // now there should be 1 actor
    cy.request('/persons')
      .its('body')
      .should('have.length', 1)
      .its('0')
      .should('include', {
        firstName: 'Joe',
        lastName: 'Smith',
      })
  })
})
