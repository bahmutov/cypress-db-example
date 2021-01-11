# Cypress DB example [![ci status][ci image]][ci url]

The application in [app.js](app.js) and [api.js](api.js) uses [Objection.js](https://github.com/Vincit/objection.js) to provide REST API on top of Sqlite3 database.

The Cypress spec files in [cypress/integration](cypress/integration) test the app by executing `cy.request` calls. To reset the database data and query the tables directly, we can use `cy.task` commands inside [cypress/plugins/index.js](cypress/plugins/index.js) file.

[ci image]: https://github.com/bahmutov/cypress-db-example/workflows/ci/badge.svg?branch=main
[ci url]: https://github.com/bahmutov/cypress-db-example/actions

