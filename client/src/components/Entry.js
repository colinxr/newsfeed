import React, { Component } from 'react';
import './Entry.css';

class Entry extends Component {
  render() {
    const entry = this.props.entryInfo;

    return (
      <div className="feed-story">
        <header className="feed-story__header">
          <div className="feed-story__img-wrap"><a href={entry.url} className="feed-story__title-link"><img src={entry.urlToImage} alt="" className="feed-story__img" /></a></div>
          <h2 clasName="feed-story__title entry-title"><a href={entry.url} className="feed-story__title-link">{entry.title}</a></h2>
          <h4 className="feed-story__source">{entry.source.name}</h4>
        </header>
        <div className="feed-story__description">
          <p>{entry.description}</p>
        </div>
      </div>
    );
  }
}

export default Entry;
