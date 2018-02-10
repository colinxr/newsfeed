import React, { Component } from 'react';
import axios from 'axios';

import './Admin.css';
import ArticleList from '../ArticleList/ArticleList';
import ArticleEditor from '../ArticleEditor/ArticleEditor';

class Admin extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      articles: [],
      articleToEdit: []
    }

    this.getPosts = this.getPosts.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.sendToEditor = this.sendToEditor.bind(this);
  }

  componentDidMount() {
    Promise.all([this.getPosts(), this.getArticles()])
      .then(([posts, articles]) => {
        this.setState({
          posts: posts.data,
          articles: articles.data.articles
        });
      })
  }

  getPosts = () => { return axios.get('api/posts'); }
  getArticles = () => { return axios.get('/api/feeds'); }

  sendToEditor = (obj) => {
    this.setState({
      articleToEdit: obj
    });
  }

  render() {
    return (
      <div className="Admin">
        <header className="Admin-header">
          <h1 className="Admin-title">A1: NewsFeed</h1>
        </header>
        <div className="admin__container">
          <ArticleList articles={this.state.articles}
          sendToEditor={this.sendToEditor}/>
          <ArticleEditor
            articleToEdit={this.state.articleToEdit}
            text={`this is some placeholder text`}
            />
        </div>
      </div>
    );
  }
}

export default Admin;
