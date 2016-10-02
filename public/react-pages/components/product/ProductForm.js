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
  getHandleSave: function() {
    return () => {
      var { handleSave } = this.props
      handleSave(this.getDataFromRefs(this.refs))
    }
  },
  getHandleCancel: function() {
    return () => {
      var { handleCancel } = this.props
      handleCancel()
    }
  },
  render: function () {
    var { categories } = this.state
    return (
      <form>
        <div className="form-group">
          <input type="text" className="form-control" id="name" placeholder="name" ref="name" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" id="brand" placeholder="Brand" ref="brand" />
        </div>
        <div className="form-group">
          <input type="number" className="form-control" id="price" placeholder="price" ref="price" />
        </div>
        <div className="form-group">
        <label>Category: </label>
          <select id="category" ref="category_id">
            <option>=-select-=</option>
            {
              _.map(categories, (c) => {
                return <option key={c.id} value={c.id}>{c.name}</option>
              })
            }
          </select>
        </div>
        <button onClick={this.getHandleSave()} className="btn btn-default">Save</button>
        <button onClick={this.getHandleCancel()} className="btn btn-default">Cancel</button>
      </form>
    )
  }
})

export default ProductForm
