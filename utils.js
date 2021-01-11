const Person = require('./models/Person')

const insertPersons = async (people) => {
  // insertGraph can run multiple queries. It's a good idea to
  // run it inside a transaction.
  const insertedGraph = await Person.transaction(async (trx) => {
    const insertedGraph = await Person.query(trx)
      // For security reasons, limit the relations that can be inserted.
      .allowGraph('[pets, children.[pets, movies], movies, parent]')
      .insertGraph(people)

    return insertedGraph
  })

  return insertedGraph
}

module.exports = {
  insertPersons,
}
