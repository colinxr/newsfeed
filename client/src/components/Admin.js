import React, { Component } from 'react';
import axios from 'axios';

import FeedEntry from './FeedEntry';
import './Admin.css';

class Admin extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      articles: [],
    }

    this.getPosts = this.getPosts.bind(this);
    this.getArticles = this.getArticles.bind(this);
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

  getPosts = () => { return axios.get('api/entries'); }

  getArticles = () => { return axios.get('/api'); }

  render() {
    return (
      <div className="Admin">
        <header className="Admin-header">
          <h1 className="Admin-title">A1: NewsFeed</h1>
        </header>
        <div className="wrapper">
          <div className="feed-entries">
            {
              Object
              .keys(this.state.articles)
              .map(key => <FeedEntry key={key} index={key}
                articleInfo={this.state.articles[key]} />)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
