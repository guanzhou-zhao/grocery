import React from 'react'
import _ from 'lodash'
import request from 'superagent'
var ProductForm = React.createClass({
  getInitialState: function () {
    return {
      categories: []
    }
  },
  componentDidMount: function () {
    request
      .get('/api/v1/category')
      .end((err, res) => {
        if(err) console.log(err)
        this.setState({categories: res.body})
      })
  },
  getDataFromRefs: function (refs) {
    return _.mapValues(refs, (v) => v.value)
  },
  getHandleSave: function(id) {
    return () => {
      var { handleSave } = this.props
      handleSave(this.getDataFromRefs(this.refs), id)
    }
  },
  getHandleCancel: function(id) {
    return () => {
      var { handleCancel } = this.props
      handleCancel(id)
    }
  },
  render: function () {
    var { categories } = this.state
    var { product } = this.props
    return (
      <form>
        <div className="form-group">
          <input type="text" className="form-control" id="name" placeholder="name" ref="name" defaultValue={product && product.name}/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" id="brand" placeholder="Brand" ref="brand" defaultValue={product && product.brand}/>
        </div>
        <div className="form-group">
          <input type="number" className="form-control" id="price" placeholder="price" ref="price"  defaultValue={product && product.price}/>
        </div>
        <div className="form-group">
        <label>Category: </label>
          <select id="category" ref="category_id"  defaultValue={product && product.category_id}>
            <option>=-select-=</option>
            {
              _.map(categories, (c) => {
                return <option key={c.id} value={c.id}>{c.name}</option>
              })
            }
          </select>
        </div>
        <input type="button" onClick={this.getHandleSave(product && product.id)} className="btn btn-default" value="Save" />
        <input type="button" onClick={this.getHandleCancel(product && product.id)} className="btn btn-default" value="Cancel"/>
      </form>
    )
  }
})

export default ProductForm
