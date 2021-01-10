const { expect } = require('chai');

module.exports = (session) => {
  describe('non-mutating related query', () => {
    class ModelOne extends session.unboundModels.Model1 {
      static get relatedFindQueryMutates() {
        return false;
      }

      static get relatedInsertQueryMutates() {
        return false;
      }
    }

    class ModelTwo extends session.unboundModels.Model2 {
      static get relatedFindQueryMutates() {
        return false;
      }

      static get relatedInsertQueryMutates() {
        return false;
      }
    }

    before(() => {
      ModelOne = ModelOne.bindKnex(session.knex);
      ModelTwo = ModelTwo.bindKnex(session.knex);
    });

    beforeEach(() => {
      return session.populate([
        {
          id: 1,
          model1Prop1: 'root',

          model1Relation1: {
            id: 2,
            model1Prop1: 'belongs to one',
          },

          model1Relation2: [
            {
              idCol: 3,
              model2Prop1: 'has many',
            },
          ],

          model1Relation3: [
            {
              idCol: 4,
              model2Prop1: 'many to many',
            },
          ],
        },
      ]);
    });

    describe('find', () => {
      it('belongs to one', () => {
        return ModelOne.query()
          .findOne({ model1Prop1: 'root' })
          .then((model) => {
            return model.$relatedQuery('model1Relation1').then(() => model);
          })
          .then((model) => {
            expect(model.toJSON()).to.eql({
              id: 1,
              model1Id: 2,
              model1Prop1: 'root',
              model1Prop2: null,
            });
          });
      });

      it('has many', () => {
        return ModelOne.query()
          .findOne({ model1Prop1: 'root' })
          .then((model) => {
            return model.$relatedQuery('model1Relation2').then(() => model);
          })
          .then((model) => {
            expect(model.toJSON()).to.eql({
              id: 1,
              model1Id: 2,
              model1Prop1: 'root',
              model1Prop2: null,
            });
          });
      });

      it('many to many', () => {
        return ModelOne.query()
          .findOne({ model1Prop1: 'root' })
          .then((model) => {
            return model.$relatedQuery('model1Relation3').then(() => model);
          })
          .then((model) => {
            expect(model.toJSON()).to.eql({
              id: 1,
              model1Id: 2,
              model1Prop1: 'root',
              model1Prop2: null,
            });
          });
      });
    });

    describe('insert', () => {
      it('belongs to one', () => {
        return ModelOne.query()
          .findOne({ model1Prop1: 'root' })
          .then((model) => {
            return model
              .$relatedQuery('model1Relation1')
              .insert({ id: 10, model1Prop1: 'new' })
              .then(() => model);
          })
          .then((model) => {
            expect(model.toJSON()).to.eql({
              id: 1,
              model1Id: 10,
              model1Prop1: 'root',
              model1Prop2: null,
            });
          });
      });

      it('has many', () => {
        return ModelOne.query()
          .findOne({ model1Prop1: 'root' })
          .then((model) => {
            return model
              .$relatedQuery('model1Relation2')
              .insert({ model2Prop1: 'new' })
              .then(() => model);
          })
          .then((model) => {
            expect(model.toJSON()).to.eql({
              id: 1,
              model1Id: 2,
              model1Prop1: 'root',
              model1Prop2: null,
            });
          });
      });

      it('many to many', () => {
        return ModelOne.query()
          .findOne({ model1Prop1: 'root' })
          .then((model) => {
            return model
              .$relatedQuery('model1Relation3')
              .insert({ model2Prop1: 'new' })
              .then(() => model);
          })
          .then((model) => {
            expect(model.toJSON()).to.eql({
              id: 1,
              model1Id: 2,
              model1Prop1: 'root',
              model1Prop2: null,
            });
          });
      });
    });
  });
};
