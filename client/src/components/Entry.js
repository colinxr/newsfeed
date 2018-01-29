import React, { Component } from 'react';
import './Entry.css';

class Entry extends Component {
  constructor() {
    super();

    this.state = {
      entry: {
        url: '',
        urltoImage: '',
        title: '',
        originalTitle: '',
        date: '',
        source: '',
        description: ''
      }
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const entry = this.props.entryInfo;

    const entryObj = {
      date: entry.date,
      description: entry.description,
      originalTitle: entry.title,
      title: entry.title,
      source: this.source.name,
      url: entry.url,
      urltoImage: entry.urlToImage,
    }
    console.log(entryObj);
    // To do
    // Axios Post the api endpoint

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
