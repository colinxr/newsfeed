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

  render() {
    const categories = this.state.categories;

    return (
      <ul className="category-list">
        <li>Show All</li>
        {
          Object
          .keys(categories)
          .map(key => {
            return <li>{categories[key]}</li>;
          })
        }

      </ul>
    )
  }
}

export default CategoryList;
