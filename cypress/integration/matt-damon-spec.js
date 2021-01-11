/// <reference types="cypress" />

describe('Matt Damon', () => {
  it('has family', () => {
    // the database already has the initial family for Matt Damon
    cy.request('/persons').its('body').should('have.length', 3)

    // let's find Matt Damon
    cy.task('findPersonByName', {
      firstName: 'Matt',
      lastName: 'Damon',
    }).then((matt) => {
      cy.request('PATCH', `/persons/${matt.id}`, { age: 41 })
      // cy.request('DELETE',`/persons/${matt.id}`)
    })
  })
})
