import React, { Component } from 'react';
import './Entry.css';

class Entry extends Component {
  render() {
    const entry = this.props.entryInfo;

    return (
      <div className="Entry">
        <div className="entry__main"><a href={entry.url} className="entry__main__link"><h2>{entry.title}</h2></a>
        <h4 className="entry__main__source">{entry.source.name}</h4>
        <p className="entry__main__desc">{entry.description}</p>
        </div>
      </div>
    );
  }
}

export default Entry;
