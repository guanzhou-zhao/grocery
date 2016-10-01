var Model = require('objection').Model
var knex = require('../db')
var _ = require('lodash')

function Category () {
  Model.apply(this, arguments)
}

Model.extend(Category)
Model.knex(knex)
Category.tableName = 'category'

module.exports = Category

Category.add = function (ct) {
  return Category.query()
    .insert(ct)
}
Category.getAll = function () {
  return Category
    .query()
}
Category.delete = function (query) {
  return Category
    .query()
    .delete()
    .where(query)
}
Category.update = function (query, data) {
  return Category
    .query()
    .update(data)
    .where(query)
}
