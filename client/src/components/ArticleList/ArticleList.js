import React, { Component } from 'react';
import axios from 'axios';

import './ArticleList.css';

import FeedEntry from '../FeedEntry/FeedEntry';

class ArticleList extends Component {
  constructor() {
    super();

    this.state = {
      articles: [],
      isLoading: true,
      errMessage: null
    }
    
    this.getAllArticles = this.getAllArticles.bind(this);
    this.getCatArticles = this.getCatArticles.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }
  
  componentDidMount() {
    Promise.all([this.getAllArticles()])
      .then((articles) => {
        this.setState({
          isLoading: false,
          articles: articles[0].data
        });
      })
      .catch(err => {
        this.setState({ errMessage: 'There\'s been an error with the Server, please try again.' });
      });
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.category !== this.props.category) {
      console.log(nextProps.category)
      Promise.all([this.getCatArticles(nextProps.category)])
        .then(articles => {
          this.setState({ articles: articles[0].data });
        })
        .catch(err => {
          this.setState({ errMessage: 'There\'s been an error with the Server, please try again.' });
        });
    }
  }

  // getPosts = () => { return axios.get('api/posts'); }
  getAllArticles = () => { return axios.get('/api/feeds'); }
  getCatArticles = (cat) => { return axios.get(`/api/feeds/${cat}`); }
  
  renderHeader() {
    
  }

  render() {
    const { errMessage, articles } = this.state;
    
    if (this.state.errMessage !== null) {
      return (
        <div className="feed-error">
          <h2>{errMessage}</h2>
        </div>
      )
    }
    return (
      <div className="feed-entries">
        {
          Object
          .keys(articles)
          .map(key => 
            <FeedEntry key={key} index={key}
              articleInfo={articles[key]}
              sendToEditor={this.props.sendToEditor}/>
          )
        }
      </div>
    );
  }
}

export default ArticleList;
