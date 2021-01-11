# Cypress DB example [![ci status][ci image]][ci url]

The application in [app.js](app.js) and [api.js](api.js) uses [Objection.js](https://github.com/Vincit/objection.js) to provide REST API on top of Sqlite3 database.

The Cypress spec files in [cypress/integration](cypress/integration) test the app by executing `cy.request` calls. To reset the database data and query the tables directly, we can use `cy.task` commands inside [cypress/plugins/index.js](cypress/plugins/index.js) file.

The tests also show how to set up the data before the spec runs, both in the interactive `cypress open` and non-interactive `cypress run` modes. See the plugins file and the [matt-damon-spec.js](./cypress/integration/matt-damon-spec.js) files.

We also use [Chai](https://www.chaijs.com/) assertions inside the plugins file to validate the data.

We collect the backend code coverage following the instructions in [cypress-io/code-coverage](https://github.com/cypress-io/code-coverage). After each run you can find the reports in the "coverage" folder.

[ci image]: https://github.com/bahmutov/cypress-db-example/workflows/ci/badge.svg?branch=main
[ci url]: https://github.com/bahmutov/cypress-db-example/actions

