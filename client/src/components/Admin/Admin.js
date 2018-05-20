import React, { Component } from 'react';

import './Admin.css';
import CategoryList from '../CategoryList/CategoryList';
import ArticleList from '../ArticleList/ArticleList';
import ArticleEditor from '../ArticleEditor/ArticleEditor';

class Admin extends Component {
  constructor() {
    super();

    this.state = {
      articleToEdit: [],
      category: 'all',
      isLoading: true,
    }

    this.sendToEditor = this.sendToEditor.bind(this);
    this.selectCat = this.selectCat.bind(this);
    this.clearEditor = this.clearEditor.bind(this);
  }

  sendToEditor = (obj) => {
    this.setState({ articleToEdit: obj });
  }

  clearEditor = () => {
    this.setState({ articleToEdit: [] });
  }

  selectCat = (category) => {
    this.setState({ category });
  }

  render() {
    const isLoading = {...this.state.isLoading};

    return (
      <div className="Admin">
        <header className="Admin-header">
          <div className="header__wrapper">
            <h2><a href="/newsfeed">This is A1</a></h2>
          </div>
        </header>
        <div className="admin__container">
          <div>
            <CategoryList selectCat={this.selectCat} />
            <ArticleList
              category={this.state.category}
              sendToEditor={this.sendToEditor}
            />
          </div>
          <ArticleEditor
            articleToEdit={this.state.articleToEdit}
            clearEditor={this.clearEditor}
          />
        </div>
      </div>
    );
  }
}

export default Admin;
