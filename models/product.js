var Model = require('objection').Model
var knex = require('../db')
var _ = require('lodash')
var Price = require('./Price')

function Product () {
  Model.apply(this, arguments)
}

Model.extend(Product)
Model.knex(knex)
Product.tableName = 'product'

module.exports = Product

Product.add = function (p) {
  Product.query()
  .insert(p)
  .then ((product) => {
    return Price
      .add(makePrice(product))
  })
}
function makePrice(product) {
  return {
    product_id: product.id,
    price: product.price,
    start_at: new Date()
  }
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
  var price = {
    product_id: query.id,
    price: data.price,
    start_at: new Date()
  }
  return Price
    .add(price)
    .then(() => {
      return Product
        .query()
        .update(data)
        .where(query)
    })
}
