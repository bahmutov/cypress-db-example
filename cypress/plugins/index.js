// let's assert parameters in our task calls, for this
// we have installed Chai NPM module and use it in the way
// similar to the specs
const { expect } = require('chai')

// we can connect to the database using the same logic as the app does
const Knex = require('knex')
const knexConfig = require('../../knexfile')
const { Model } = require('objection')
const knex = Knex(knexConfig.development)
Model.knex(knex)

// if we want to query the Person table, we can use
// the same model class as the app does
const Person = require('../../models/Person')
const { insertPersons } = require('../../utils')

const onBeforeSpec = async (spec) => {
  console.log('before:spec %s', spec.name)
  if (spec.name === 'matt-damon-spec.js') {
    const mattDamonFamily = require('../fixtures/matt-damon.json')
    console.log('removing existing people')
    await Person.query().truncate()
    console.log('inserting %o', mattDamonFamily)
    await insertPersons(mattDamonFamily)
  }

  return null
}

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // see https://on.cypress.io/before-spec-api
  on('before:spec', onBeforeSpec)

  on('task', {
    beforeSpec: onBeforeSpec,

    // before every test we should reset the data to a known good state
    resetPeopleTable() {
      console.log('reset People table')
      // this call returns a Promise, working nicely
      // with cy.task (which expects a value or a Promise)
      return Person.query().truncate()
    },

    // we can use the "async/await" syntax, since Cypress
    // comes with the bundled Node v12
    async findPerson(id) {
      // an example of using Chai assertions to validate
      // data inside the plugins file
      expect(id, 'valid id').to.be.a('number').above(0)
      console.log('looking for person with id %d', id)
      const p = await Person.query().findById(id)
      return p || null
    },
  })
}
