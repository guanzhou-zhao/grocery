import React, { Component } from 'react'
import request from 'superagent'
import _ from 'lodash'
class Category extends Component {

  constructor (props) {
    super(props)
    this.state = {
      categories: [],
      addingNew: false,
      isNameNull: false,
      editting: [],
      searchTerm: ''
    }
  }
  componentDidMount() {
    request
      .get('/api/v1/category')
      .end((err, res) => {
        if(err) console.log(err)
        this.setState({categories: res.body})
      })
  }
  handleClick () {
    var value = this.refs.name.value
    if (_.isNil(value) || value.trim().length < 1) {
      this.setState({isNameNull: true})
      setInterval(() => {
        this.setState({isNameNull: false})
      }, 2000)
      return
    }
    request
      .post('/api/v1/category')
      .send({name: value})
      .end((err, res) => {
        var { categories } = this.state
        categories.push(res.body)
        this.setState({categories})
      })
  }
  handleDelete (id, index) {
    return () => {
      request
        .del(`/api/v1/category/${id}`)
        .end((err, res) => {
          if (err) console.log(err)
            var { categories } = this.state
            categories.splice(index, 1)
            this.setState({categories})
        })
    }
  }
  handleEdit (id) {
    var { editting } = this.state
    return () => {
      editting.push(id)
      this.setState({editting})
    }
  }
  handleEditSave (id) {
    return () => {
      var { editting, categories } = this.state
      var name = this.refs[`editting${id}`].value
      request
        .put(`/api/v1/category/${id}`)
        .send({name})
        .end((err, res) => {
          if (res.body > 0) {
            _.each(categories, (c) => {
              if (c.id === id) c.name = name
            })
            _.remove(editting, (e) => {
              return e === id
            })
            this.setState(categories)
          } else {
            console.log('fail to update');
          }
        })
    }
  }
  handleSearch () {
    var searchTerm = this.refs.searchTerm.value
    this.setState({searchTerm})
  }
  render () {
    var { categories, isNameNull, editting, searchTerm } = this.state
    var filtered = _.filter(categories, (c) => {
      return c.name.toLowerCase().indexOf(searchTerm.trim().toLowerCase()) > -1
    })
    return (
      <div className="col-md-6 col-md-offset-3">
        <div className="col-md-6">
          <input type="text" placeholder="Search..." ref="searchTerm" onChange={this.handleSearch.bind(this)}/>
        </div>
        <div className="col-md-6">
          <input type="text" placeholder="new category name" ref="name" onChange={() => {this.setState({isNameNull: false})}}/>
          <br/>
          <input type="button" onClick={this.handleClick.bind(this)} value="Add New Category" />
          <br/>
          {isNameNull ? <span>type something before save</span> : null}
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {
            _.map(filtered, (ct, index) => {
              return (
                !_.isEmpty(editting) && editting.indexOf(ct.id) > -1 ?
                (
                  <tr key={index}>
                    <td>
                    <input type="text" ref={`editting${ct.id}`} defaultValue={ct.name} />
                    </td>
                    <td>
                    <input type="button" onClick={this.handleEditSave(ct.id)} value="Save" />
                    </td>
                  </tr>
                )
                :
                (
                  <tr key={index}>
                  <td>{ct.name}</td>
                  <td>
                  <input type="button" onClick={this.handleEdit(ct.id)} value="edit" />
                  <input type="button" onClick={this.handleDelete(ct.id, index)} value="delete" />
                  </td>
                  </tr>
                )
              )
            })
          }
          </tbody>
        </table>
      </div>
    )
  }

}

export default Category
