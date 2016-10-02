
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('product', function (table) {
    table.integer('id').primary()
    table.string('name')
    table.string('brand')
    table.decimal('price')
    table.integer('category_id')
    table.timestamps(true, true)
    table.foreign('category_id').references('category.id')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('product')
}
