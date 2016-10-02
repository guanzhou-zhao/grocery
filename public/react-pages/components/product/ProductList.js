import React from 'react'
import _ from 'lodash'
import request from 'superagent'
import ProductForm from './ProductForm'

var ProductList = React.createClass({
  getInitialState: function () {
    var { products } = this.props
    return {
      editting: []
    }
  },
  handleDelete: function (id) {
    var { reloadProductList } = this.props
    return () => {
      request
        .del(`/api/v1/product/${id}`)
        .end((err, res) => {
          if (err) console.log(err)
            reloadProductList()
        })
    }
  },
  handleEdit: function (id) {
    return () => {
      var { editting } = this.state
      editting.push(id)
      this.setState(editting)
    }
  },
  render: function () {
    var { editting } = this.state
    var { products } = this.props
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Category</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {
            _.map(products, (p) => {
              return (
                editting.indexOf(p.id) > -1 ?         <ProductForm product={p}/> : (
                 <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.brand}</td>
                  <td>{p.price}</td>
                  <td>{p.category_name}</td>
                  <td>
                    <input type="button" onClick={this.handleEdit(p.id)} value="edit" />
                    <input type="button" onClick={this.handleDelete(p.id)} value="delete" />
                  </td>
                </tr>
                )
              )
            })
          }
        </tbody>
      </table>
    )
  }
})

export default ProductList
