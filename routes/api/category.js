var router = require('express').Router()
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
var log = require('debug')('routes:index:log')
var _ = require('lodash')
var path = require('path')
var Category = require('../../models/category')
module.exports = router

router.get('/', (req, res, next) => {
    Category.getAll()
      .then((categories) => {
        res.json(categories)
      })
})
router.post('/', (req, res, next) => {
  Category
    .add(req.body)
    .then((result) => {
      res.json(result)
    })
})
router.delete('/:id', (req, res, next) => {
  Category
    .delete(req.params)
    .then((result) => {
      console.log(result);
      res.json(result)
    })
})
router.put('/:id', (req, res, next) => {
  console.log('query', req.params);
  console.log('data', req.body);
  Category
    .update(req.params, req.body)
    .then((result) => {
      console.log(result);
      res.json(result)
    })
})
