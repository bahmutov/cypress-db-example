'use strict';

const { QueryBuilderOperation } = require('./QueryBuilderOperation');

class FirstOperation extends QueryBuilderOperation {
  onBuildKnex(knexBuilder, builder) {
    const modelClass = builder.modelClass();

    if (builder.isFind() && modelClass.useLimitInFirst) {
      knexBuilder = knexBuilder.limit(1);
    }

    return knexBuilder;
  }

  onAfter3(_, result) {
    if (Array.isArray(result)) {
      return result[0];
    } else {
      return result;
    }
  }
}

module.exports = {
  FirstOperation,
};
