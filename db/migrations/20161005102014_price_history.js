
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('price_history', function (table) {
    table.integer('id').primary()
    table.integer('product_id')
    table.decimal('price')
    table.date('start_at')
    table.timestamps(true, true)
    table.foreign('product_id').references('product.id')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('price_history')
}
