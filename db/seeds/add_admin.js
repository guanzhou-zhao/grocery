var bcrypt = require('../../lib/bcrypt')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('user').insert({username: 'rosfiled', hash: bcrypt.hash('s39_p123K')})
      ]);
    });
};