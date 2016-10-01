var router = require('express').Router()
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
var log = require('debug')('routes:index:log')
var _ = require('lodash')
var path = require('path')
var Category = require('../models/category')
module.exports = router

router.get('/add', (req, res, next) => {
  res.render('category/add')
})
router.post('/', (req, res, next) => {
  console.log(req.body);
  Category
    .add(req.body)
    .then(() => {
      res.redirect('/')
    })
})
