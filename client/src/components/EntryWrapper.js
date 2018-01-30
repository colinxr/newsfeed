import React, { Component } from 'react';
import FeedEntry from './FeedEntry';

import './EntryWrapper.css';

class EntryWrapper extends Component {
  render() {

    const props = this.props.entries.length ? this.props.entries : this.props.posts;

    if (!props) {
      return null;
    }

    return (
      <div className="wrapper">
        {
          Object
          .keys(props)
          .map(key => <FeedEntry key={key} index={key}
            entryInfo={props[key]} />)
        }
      </div>
    );
  }
}

export default EntryWrapper;
