import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './ArticleList.css';

import LoadingEntry from '../LoadingEntry/LoadingEntry';
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
  }

  componentDidMount() {
    this.getAllArticles()
      .then((articles) => {
        this.setState({
          isLoading: false,
          articles: articles.data
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          errMessage: 'There\'s been an error with the Server, please try again.' });
      });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.category !== this.props.category) {
      this.setState({
        isLoading: true,
        articles: {}
      });

      if (nextProps.category === 'all') {
        this.getAllArticles()
          .then(articles => {
            this.setState({
              isLoading: false,
              articles: articles.data
            });
            return;
          })
      } else {
        this.getCatArticles(nextProps.category)
          .then(articles => {
            this.setState({
              isLoading: false,
              articles: articles.data });
          })
          .catch(err => {
            this.setState({ errMessage: 'There\'s been an error with the Server, please try again.' });
          });
      }
    }
  }

  getAllArticles = () => {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.REACT_APP_API_URL}/api/feeds`)
      .then(resp => resolve(resp))
      .catch(err => reject(err));
  });
}

  getCatArticles = (cat) => {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.REACT_APP_API_URL}/api/feeds/${cat}`)
        .then(resp => resolve(resp))
        .catch(err => reject(err));
    });
  }

  render() {
    const { isLoading, errMessage, articles } = this.state;
		console.log(articles.length);

    if (isLoading === true) {
      return (
        <div>
          <LoadingEntry />
          <LoadingEntry />
          <LoadingEntry />
          <LoadingEntry />
          <LoadingEntry />
        </div>
      )
    } else {
      if (this.state.errMessage !== null) {
        return (
          <div className="feed-error">
            <h2>{errMessage}</h2>
          </div>
        )
      }

      return (
        <div className="feed-entries">
          <div className="feed-header">
            <h2>{this.props.category} Feed</h2>
          </div>
          {
            Object
            .keys(articles)
            .map(key =>
              <FeedEntry key={key}
								index={key}
                articleInfo={articles[key]}
                sendToEditor={this.props.sendToEditor}/>
            )
          }
        </div>
      );
    }
  }
}

ArticleList.propTypes = {
	category: PropTypes.string.isRequired,
	sendToEditor: PropTypes.func.isRequired,
}

export default ArticleList;
