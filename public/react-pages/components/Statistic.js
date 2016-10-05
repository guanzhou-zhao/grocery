import React from 'react'
import request from 'superagent'
import _ from 'lodash'
import Chart from './statistic/Chart'
import Menu from './statistic/Menu'

var Statistic = React.createClass({
  render () {
    return (
      <div className="col-md-6 col-md-offset-3">
        <div className="row">
          <Menu />
        </div>
        <div className="row">
          <Chart />
        </div>
      </div>
    )
  }
})
export default Statistic
