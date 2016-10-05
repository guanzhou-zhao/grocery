import React, { Component } from 'react'
import Menu from './Menu'
import Category from './Category'
import Product from './Product'
import Statistic from './Statistic'
class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      currentPage: 'price_chart',
      pages: []
    }
    this.changeCurrentPage = this.changeCurrentPage.bind(this)
  }
  componentDidMount () {

  }
  changeCurrentPage (currentPage) {
    this.setState({currentPage})
  }
  getCurrentPage (currentPage) {
    var page
    switch (currentPage) {
      case 'product':
        page = <Product />
        break
      case 'category':
        page = <Category />
        break
      case 'price_chart':
        page = <Statistic />
        break
      default:
        page = <Statistic />
        break
    }
    return page
  }
  render () {
    var { currentPage } = this.state
    return (
      <div>
        <Menu changeCurrentPage={this.changeCurrentPage} currentPage={currentPage}/>
        { this.getCurrentPage(currentPage) }
      </div>
    )
  }

}

export default App
