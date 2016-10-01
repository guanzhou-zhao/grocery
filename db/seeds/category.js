
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('category').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('category').insert({name: 'Fruit'}),
        knex('category').insert({name: 'Vegetable'}),
        knex('category').insert({name: 'Main food'})
      ]);
    });
};
