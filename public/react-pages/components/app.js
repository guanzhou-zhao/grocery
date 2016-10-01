import React, { Component } from 'react'
import Menu from './Menu'
import Category from './Category'
class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      currentPage: 'category'
    }
  }

  render () {
    var { currentPage } = this.state
    return (
      <div>
        <Menu />
            <Category />
      </div>
    )
  }

}

export default App
