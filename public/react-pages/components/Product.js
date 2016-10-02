import React from 'react'
import Search from './product/Search'
import ProductForm from './product/ProductForm'
import ProductList from './product/ProductList'
import request from 'superagent'
import _ from 'lodash'

var Product = React.createClass({
  getInitialState: function() {
    return {
      searchTerm: '',
      adding: false,
      products: []
    }
  },
  componentDidMount: function () {
    request
      .get('/api/v1/product')
      .end((err, res) => {
        if (err) console.log('err', err)
        this.setState({products: res.body})
      })
  },
  setSearchTerm: function (searchTerm) {
    this.setState({searchTerm})
  },
  handleAddClick: function () {
    this.setState({adding: true})
  },
  setAdding: function (adding) {
    this.setState({adding})
  },
  reloadProductList: function () {
    request
      .get('/api/v1/product')
      .end((err, res) => {
        if (err) console.log('err', err)
        this.setState({products: res.body})
      })
  },
  handleSave: function (data) {
    request
      .post('/api/v1/product/')
      .send(data)
      .end((err, res) => {
        if (err) console.log(err)
        this.setAdding(false)
        this.reloadProductList()
      })
  },
  handleCancel: function () {
    this.setAdding(false)
  },
  render: function() {
    var { adding, products, searchTerm } = this.state
    var filteredProducts = _.filter(products, (p) => {
      var st = searchTerm.trim().toLowerCase()
      return (
        p.name.toLowerCase().indexOf(st) > -1
        ||
        p.brand.toLowerCase().indexOf(st) > -1
      )
    })
    return (
      <div className="col-md-6 col-md-offset-3">
        <div className="col-md-6">
          <Search setSearchTerm={this.setSearchTerm}/>
        </div>
        <div className="col-md-6">
          {!adding && <input type="button" value="Add Product" onClick={this.handleAddClick} />}
        </div>
        <div className="col-md-12">
        {adding && <ProductForm handleSave={this.handleSave} handleCancel={this.handleCancel}/>}
        </div>
        <div className="col-md-12">
          <ProductList products={filteredProducts} reloadProductList={this.reloadProductList}/>
        </div>
      </div>
    )
  }
})
export default Product
