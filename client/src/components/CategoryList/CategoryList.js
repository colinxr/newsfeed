import React, { Component } from 'react';
import axios from 'axios';

class CategoryList extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      currentCat: null,
      errMessage: null
    }

    this.getCategories = this.getCategories.bind(this);
  }

  componentDidMount() {
    this.getCategories()
      .then(resp => {
        console.log(resp.data);
        this.setState({ categories: resp.data });
      })
      .catch(err => {
        this.setState({ errMessage: 'There\'s been an error with the API' });
      });
  }

  getCategories = () => { return axios.get('/api/feeds/categories'); }

  handleClick(e) {
    e.preventDefault();
    const newCategory = e.currentTarget.innerHTML;
    this.props.selectCat(newCategory);
  }

  render() {
    const categories = this.state.categories;

    return (
      <ul className="category-list">
        <li><a href="#" onClick={(e) => {this.handleClick(e)}}>Show All</a></li>
        <li>Twitter</li>
        {
          Object
          .keys(categories)
          .map(key => {
            return <li key={key} id={key}><a href="#" onClick={(e) => {this.handleClick(e)}}>{categories[key]}</a></li>;
          })
        }

      </ul>
    )
  }
}

export default CategoryList;
