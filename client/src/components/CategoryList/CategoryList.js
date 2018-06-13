import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './CategoryList.css';

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

  getCategories = () => { return axios.get(`${process.env.REACT_APP_API_URL}/api/feeds/categories`); }


  handleClick(e) {
    e.preventDefault();
    const newCategory = e.currentTarget.innerHTML;
    this.props.selectCat(newCategory);
  }

  handleReset(e) {
    e.preventDefault();
    this.props.selectCat('all');
  }

  render() {
    const {categories} = this.state;

    return (
      <ul className="category-list">
        <li><a href="#" onClick={(e) => {this.handleReset(e)}}>Show All</a></li>
        <li><a href="#">Twitter</a></li>
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

CategoryList.propTypes = {
	selectCat: PropTypes.func.isRequired,
}

export default CategoryList;
