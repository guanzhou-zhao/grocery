var router = require('express').Router()
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
var log = require('debug')('routes:index:log')
var _ = require('lodash')
var path = require('path')
var Product = require('../../models/product')
module.exports = router

router.get('/', (req, res, next) => {
    Product.getAll()
      .then((categories) => {
        res.json(categories)
      })
})
router.post('/', (req, res, next) => {
  Product
    .add(req.body)
    .then((result) => {
      res.json(result)
    })
})
router.delete('/:id', (req, res, next) => {
  console.log('delete product params', req.params);
  Product
    .delete(req.params)
    .then((result) => {
      console.log('delete result', result);
      res.json(result)
    })
})
router.put('/:id', (req, res, next) => {
  console.log('query', req.params);
  console.log('data', req.body);
  Product
    .update(req.params, req.body)
    .then((result) => {
      console.log(result);
      res.json(result)
    })
})
