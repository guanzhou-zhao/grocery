import React from 'react'
import request from 'superagent'
import _ from 'lodash'

var Menu = React.createClass({
  getInitialState () {
    return {
      categories: [],
      products: [],
      filter: {
        isFiltering: false
      }
    }
  },
  componentDidMount () {
    request
      .get('/api/v1/category')
      .end((err, res) => {
        if(err) console.log(err)
        this.setState({categories: res.body})
      })
    request
      .get('/api/v1/product')
      .end((err, res) => {
        if (err) console.log('err', err)
        this.setState({products: res.body})
      })
  },
  setCategoryFilter () {
    return () => {
      var categoryId = this.refs.category_id.value
      this.setState({
        filter: {
          isFiltering: !!_.toNumber(categoryId),
          categoryId: !!_.toNumber(categoryId) ? categoryId : -1
        }
      })
    }
  },
  getFilteredProduct (products, filter) {
    if (!filter.isFiltering) {
      return products
    }
    return _.filter(products, (p) => {
      return p.id === filter.categoryId
    })
  },
  render () {
    var { categories, products, filter } = this.state
    console.log(this.getFilteredProduct(products, filter));
    return (
      <div>
        <label>Category: </label>
          <select id="category" ref="category_id" onChange={this.setCategoryFilter()} defaultValue={0}>
            <option value={false}>=-select-=</option>
              {
                _.map(categories, (c, index) => {
                  return <option key={index} value={c.id}>{c.name}</option>
                })
              }
          </select>
          <label>Porduct: </label>
            <select id="product" ref="product_id">
              <option>=-select-=</option>
                {
                  _.map(this.getFilteredProduct(products, filter), (p, index) => {
                    return <option key={index} value={p.id}>{p.name}</option>
                  })
                }
            </select>
      </div>
    )
  }
})
export default Menu
