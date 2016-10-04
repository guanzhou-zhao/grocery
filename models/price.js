var Model = require('objection').Model
var knex = require('../db')
var _ = require('lodash')

function Price () {
  Model.apply(this, arguments)
}

Model.extend(Price)
Model.knex(knex)
Price.tableName = 'price_history'

module.exports = Price

Price.add = function (p) {
  return Price.query()
    .insert(p)
}
