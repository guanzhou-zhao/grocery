import React from 'react'

var Search = React.createClass({
  handleChange: function() {
    var searchTerm = this.refs.searchTerm.value
    var { setSearchTerm } = this.props
    setSearchTerm(searchTerm)
  },
  render: function () {
    return <input type="text" placeholder="Search..." ref="searchTerm" onChange={this.handleChange} />
  }
})

export default Search
