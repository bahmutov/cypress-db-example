const { expect } = require('chai')
const Knex = require('knex')
const knexConfig = require('../../knexfile')
const { Model } = require('objection')
const knex = Knex(knexConfig.development)
Model.knex(knex)
const Person = require('../../models/Person')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  on('task', {
    resetPeopleTable() {
      console.log('reset People table')
      return Person.query().truncate()
    },
    async findPerson(id) {
      expect(id, 'valid id').to.be.a('number').above(0)
      console.log('looking for person with id %d', id)
      const p = await Person.query().findById(id)
      return p || null
    },
  })
}
