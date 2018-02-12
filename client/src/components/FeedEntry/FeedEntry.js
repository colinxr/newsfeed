import React, { Component } from 'react';
import axios from 'axios';

import './FeedEntry.css';

import Thumbnail from '../Thumbnail/Thumbnail';

class FeedEntry extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.apiPost = this.apiPost.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const article = this.props.articleInfo;

    const stripTags = article.description.replace(/(<([^>]+)>)/ig,"");
    const desc = stripTags.slice(0,250) + '...';

    const articleObj = {
      date: article.pubDate,
      description: desc,
      originalTitle: article.title,
      title: article.title,
      source: article.meta.title,
      url: article.link,
      urlToImage: article.image.url || ''
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
    const stripTags = article.description.replace(/(<([^>]+)>)/ig,"");

    const desc = stripTags.slice(0,250) + '...';

    //console.log(article.enclosures[0].url);

    const articleImg = article.image.url || '';

    return (
      <div className="feed-entry">
        <Thumbnail
          classname="feed-entry"
          location="ArticleList"
          url={articleImg}
        />
        {/*<div className="feed-entry__img-wrap">
          <a href={article['rss:link']['#']} className="feed-entry__title-link"><img src={article.urlToImage} alt="" className="feed-entry__img" /></a>
        </div>*/}
        <div className="feed-entry__body">
          <header>
            <h2 className="feed-entry__title article-title"><a href={article.link} className="feed-entry__title-link" target="_blank">{article.title}</a></h2>
            <h4>{article.meta.title}</h4>
          </header>
        <div className="feed-entry__description">
          <p>{desc}</p>
        </div>
        <div className="feed-entry__action-bar"><span className="feed-entry__action-bar__save" onClick={(e) => this.handleClick(e)}>Save</span></div>
        </div>
      </div>
    );
  }
}

export default FeedEntry;
