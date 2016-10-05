import React from 'react'
import request from 'superagent'
import _ from 'lodash'
import Chart from './statistic/Chart'
import Menu from './statistic/Menu'

var Statistic = React.createClass({
  getInitialState: function() {
    return {
      product_id: 12,
      prices: []
    }
  },
  componentDidMount() {
    var {product_id} = this.state
    request
      .get('/api/v1/statistics/price')
      .send({id: product_id})
      .end((err, res) => {
        if (err) console.log('err', err)
        // this.setState({products: res.body})
        console.log('price', res.body);
        this.setState({prices: res.body})
      })
  },
  render () {
    var {product_id, prices} = this.state
    return (
      <div className="col-md-6 col-md-offset-3">
        <div className="row">
          <Menu product_id={product_id}/>
        </div>
        <div className="row">
          <Chart product_id={product_id} prices={prices}/>
        </div>
      </div>
    )
  }
})
export default Statistic
