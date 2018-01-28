import React, { Component } from 'react';
import './Entry.css';

class Entry extends Component {
  render() {
    const { entry } = this.props.entryInfo;

    return (
      <div className="Entry">
        <div className="entry__main"><a href={this.props.entryInfo.url} className="entry__main__link"><h2>{this.props.entryInfo.title}</h2></a></div>
      </div>
    );
  }
}

export default Entry;
