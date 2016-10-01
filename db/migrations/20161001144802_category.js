
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('category', function (table) {
    table.integer('id').primary()
    table.string('name')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('category')
};
