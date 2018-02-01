import React, { Component } from 'react';
import axios from 'axios';

import Thumbnail from './Thumbnail';
import './FeedEntry.css';

class FeedEntry extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.apiPost = this.apiPost.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const article = this.props.articleInfo;

    const articleObj = {
      date: article.date,
      description: article.description,
      originalTitle: article.title,
      title: article.title,
      source: article.source.name,
      url: article.url,
      urlToImage: article.urlToImage,
    }

    this.props.sendToEditor(articleObj);

    // this.apiPost(articleObj)
    //   .then(res => {
    //     console.log(res);
    //   }).catch(err => {
    //     console.log(err);
    //   });
  }

  apiPost = async (obj) => {
    const response = await axios.post('/api/posts', obj);
    console.log(response);
    const body = await response.data;

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  render() {
    const article = this.props.articleInfo;

    return (
      <div className="feed-entry">
        <Thumbnail
          classname="feed-entry" location="ArticleList"
          url={article.urlToImage}
        />
      {/*  <div className="feed-entry__img-wrap">
          <a href={article.url} className="feed-entry__title-link"><img src={article.urlToImage} alt="" className="feed-entry__img" /></a>
        </div>*/}
        <div className="feed-entry__body">
          <header>
            <h2 className="feed-entry__title article-title"><a href={article.url} className="feed-entry__title-link" target="_blank">{article.title}</a></h2>
            <h4>{article.source.name}</h4>
          </header>
        <div className="feed-entry__description">
          <p>{article.description}</p>
        </div>
        <div className="feed-entry__action-bar"><span className="feed-entry__action-bar__save" onClick={(e) => this.handleClick(e)}>Save</span></div>
        </div>
      </div>
    );
  }
}

export default FeedEntry;
