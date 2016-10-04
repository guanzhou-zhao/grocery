
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  console.log(knex.fn);
  return Promise.all([
    // Inserts seed entries
    knex('price_history').insert({product_id: 2, price: 3, start_at: new Date(2016, 8, 28)}),
    knex('price_history').insert({product_id: 2, price: 2, start_at: new Date(2016, 8, 29)}),
    knex('price_history').insert({product_id: 2, price: 1, start_at: new Date(2016, 8, 30)}),
    knex('price_history').insert({product_id: 2, price: 4, start_at: new Date(2016, 9, 1)}),
    knex('price_history').insert({product_id: 2, price: 3.5, start_at: new Date(2016, 9, 2)}),
    knex('price_history').insert({product_id: 2, price: 2.5, start_at: new Date(2016, 9, 3)}),
    knex('price_history').insert({product_id: 2, price: 2, start_at: new Date(2016, 9, 4)})
  ]);
};
