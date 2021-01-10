# Composite keys

Composite (compound) keys are fully supported. Just give an array of columns where you would normally give a single column name. Composite primary key can be specified by setting an array of column names to the [idColumn](/api/model/static-properties.html#static-idcolumn) of a model class.

Here's a list of methods that may help working with composite keys:

- [whereComposite](/api/query-builder/find-methods.html#wherecomposite)
- [whereInComposite](/api/query-builder/find-methods.html#whereincomposite)
- [findById](/api/query-builder/find-methods.html#findbyid)
- [findByIds](/api/query-builder/find-methods.html#findbyids)
- [deleteById](/api/query-builder/mutate-methods.html#deletebyid)
- [updateAndFetchById](/api/query-builder/mutate-methods.html#updateandfetchbyid)
- [patchAndFetchById](/api/query-builder/mutate-methods.html#patchandfetchbyid)
- [\$id](/api/model/instance-methods.html#id)

## Examples

Specifying a composite primary key for a model:

```js
class Person extends Model {
  static get idColumn() {
    return ['firstName', 'lastName', 'dateOfBirth'];
  }
}
```

Specifying a relation using a composite primary key and a composite foreign key:

```js
class Person extends Model {
  static get tableName() {
    return 'persons';
  }

  static get relationMappings() {
    return {
      pets: {
        relation: Model.BelongsToOneRelation,
        modelClass: Animal,
        join: {
          from: [
            'persons.firstName',
            'persons.lastName',
            'persons.dateOfBirth'
          ],
          to: [
            'animals.ownerFirstName',
            'animals.ownerLastName',
            'animals.ownerDateOfBirth'
          ]
        }
      }
    };
  }
}
```

[findById](/api/query-builder/find-methods.html#findbyid):

```js
await Person.query().findById([1, 'something', 7]);
```

[whereComposite](/api/query-builder/find-methods.html#wherecomposite):

```js
await Person.query().whereComposite(['foo', 'bar'], [1, 'barValue']);
```

[whereInComposite](/api/query-builder/find-methods.html#whereincomposite):

```js
await Person.query().whereInComposite(
  ['foo', 'bar'],
  [
    [1, 'barValue1'],
    [2, 'barValue2']
  ]
);
```
