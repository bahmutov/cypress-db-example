before(() => {
  if (Cypress.config('isInteractive')) {
    cy.task('beforeSpec', Cypress.spec)
  }
})
