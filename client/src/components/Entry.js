import React, { Component } from 'react';
import axios from 'axios';

import './Entry.css';

class Entry extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.apiPost = this.apiPost.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const entry = this.props.entryInfo;

    const entryObj = {
      date: entry.date,
      description: entry.description,
      originalTitle: entry.title,
      title: entry.title,
      source: entry.source.name,
      url: entry.url,
      urltoImage: entry.urlToImage,
    }
    console.log(entryObj);

    this.apiPost(entryObj)
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
  }

  apiPost = async (obj) => {
    const response = await axios.post('/api/entries', obj);
    console.log(response);
    const body = await response.data;

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  render() {
    const entry = this.props.entryInfo;

    return (
      <div className="feed-story">
        <header className="feed-story__header">
          <div className="feed-story__img-wrap"><a href={entry.url} className="feed-story__title-link"><img src={entry.urlToImage} alt="" className="feed-story__img" /></a></div>
          <h2 className="feed-story__title entry-title"><a href={entry.url} className="feed-story__title-link">{entry.title}</a></h2>
          <h4 className="feed-story__source">{entry.source.name}</h4>
        </header>
        <div className="feed-story__description">
          <p>{entry.description}</p>
        </div>
        <div className="feed-story__action-bar"><span className="feed-story__action-bar__save" onClick={(e) => this.handleClick(e)}>Save</span></div>
      </div>
    );
  }
}

export default Entry;
