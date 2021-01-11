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

  it('updates Person information', () => {
    cy.request('POST', '/persons', {
      firstName: 'Joe',
      lastName: 'Smith',
    })
      .its('body.id')
      .then((id) => {
        expect(id, 'created id').to.be.a('number')
        cy.request({
          method: 'PATCH',
          url: `/persons/${id}`,
          body: {
            lastName: 'Pesci',
          },
        })
          .its('body')
          .should('deep.equal', {
            success: true,
          })
        // how to check the full record with id: 1?
        cy.task('findPerson', id).should('include', {
          id,
          firstName: 'Joe',
          lastName: 'Pesci',
        })
      })
  })
})
