import React, { Component } from 'react';
import axios from 'axios';

import './Admin.css';
import ArticleList from '../ArticleList/ArticleList';
import ArticleEditor from '../ArticleEditor/ArticleEditor';
import Loading from '../Loading/Loading';

class Admin extends Component {
  constructor() {
    super();

    this.state = {
      articleToEdit: [],
      category: 'all',
      isLoading: true,
    }

    this.sendToEditor = this.sendToEditor.bind(this);
  }

  sendToEditor = (obj) => {
    this.setState({
      articleToEdit: obj
    });
  }

  render() {
    const isLoading = {...this.state.isLoading};

    return (
      <div className="Admin">
        <header className="Admin-header">
          <h1 className="Admin-title"><a href="/">A1: NewsFeed</a></h1>
        </header>
        <div className="admin__container">
          <ArticleList
            category={this.state.category}
            sendToEditor={this.sendToEditor}
          />
          <ArticleEditor
            articleToEdit={this.state.articleToEdit}
          />
        </div>
      </div>
    );
  }
}

export default Admin;
