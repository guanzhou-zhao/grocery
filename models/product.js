var Model = require('objection').Model
var knex = require('../db')
var _ = require('lodash')

function Product () {
  Model.apply(this, arguments)
}

Model.extend(Product)
Model.knex(knex)
Product.tableName = 'product'

module.exports = Product

Product.add = function (p) {
  return Product.query()
    .insert(p)
}
Product.getAll = function () {
  return Product
    .query()
    .select('product.*', 'cat.name as category_name')
    .join('category as cat', 'product.category_id', 'cat.id')
}
Product.delete = function (query) {
  return Product
    .query()
    .delete()
    .where(query)
}
Product.update = function (query, data) {
  return Product
    .query()
    .update(data)
    .where(query)
}
