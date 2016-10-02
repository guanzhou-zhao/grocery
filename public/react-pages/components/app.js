import React, { Component } from 'react'
import Menu from './Menu'
import Category from './Category'
import Product from './Product'
class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      currentPage: ''
    }
    this.changeCurrentPage = this.changeCurrentPage.bind(this)
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
      default:
        page = <Product />
        break
    }
    return page
  }
  render () {
    var { currentPage } = this.state
    return (
      <div>
        <Menu changeCurrentPage={this.changeCurrentPage}/>
        { this.getCurrentPage(currentPage) }
      </div>
    )
  }

}

export default App
