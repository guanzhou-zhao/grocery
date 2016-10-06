var router = require('express').Router()
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
var log = require('debug')('routes:index:log')
var _ = require('lodash')
var path = require('path')
var knex = require('../../db')
module.exports = router

router.get('/price', (req, res, next) => {
  console.log('req.body', req.body);
    knex
      .from('product as p')
      .innerJoin('price_history as hi', 'p.id', 'hi.product_id')
      .where('p.id', 2)
      .select('p.*', 'hi.price', 'hi.start_at')
      .then((result) => {
        res.json(result)
      })
})
