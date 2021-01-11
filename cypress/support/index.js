import '@cypress/code-coverage/support'

before(() => {
  if (Cypress.config('isInteractive')) {
    cy.task('beforeSpec', Cypress.spec)
  }
})
