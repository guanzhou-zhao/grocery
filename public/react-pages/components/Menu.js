import React, { Component } from 'react'

class Menu extends Component {

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(newPage) {
    var { changeCurrentPage } = this.props
    return () => {
      changeCurrentPage(newPage)
    }
  }
  render () {
    var { currentPage } = this.props
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Grocery</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className={currentPage === 'category' ? 'active' : null}><a onClick={this.handleClick('category')} href="#">Category <span className="sr-only">(current)</span></a></li>
              <li className={currentPage === 'product' ? 'active' : null}><a onClick={this.handleClick('product')} href="#">Product</a></li>
              <li className={`dropdown ${currentPage === 'price_chart' ? 'active' : null}`}>
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Statistic <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a onClick={this.handleClick('price_chart')} href="#">Product price</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="#">Separated link</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="#">One more separated link</a></li>
                </ul>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
            <ul className="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" className="divider"></li>
            <li><a href="#">Separated link</a></li>
            </ul>
            </li>
              <li><a href="/logout">Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }

}

export default Menu
