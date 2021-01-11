/// <reference types="cypress" />

describe('Matt Damon', () => {
  it('has family', () => {
    // the database already has the initial family for Matt Damon
    cy.request('/persons').its('body').should('have.length', 3)

    // let's find Matt Damon
    cy.task('findPersonByName', {
      firstName: 'Matt',
      lastName: 'Damon',
      withGraph: '[pets, children]',
    }).then((matt) => {
      cy.request('PATCH', `/persons/${matt.id}`, { age: 41 })
      cy.request('DELETE', `/persons/${matt.children[0].id}`)
        .its('body')
        .should('deep.equal', { success: true })
      cy.request('POST', `/persons/${matt.id}/children`, {
        firstName: 'Isabella',
        lastName: 'Damon',
        age: 13,
      })
        .its('body')
        .then((isabella) => {
          expect(isabella.id, 'new id').to.be.gt(1)
          cy.request('POST', `/persons/${isabella.id}/pets`, {
            name: 'Chewy',
            species: 'hamster',
          })
        })
      // we can continue interacting with our API
    })
  })
})
