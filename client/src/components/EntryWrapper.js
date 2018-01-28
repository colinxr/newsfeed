import React, { Component } from 'react';
import Entry from './Entry';

import './EntryWrapper.css';

class EntryWrapper extends Component {
  render() {

    if (!this.props.entries.length) {
      return null;
    }

    return (
      <div className="wrapper">
        {
          Object
          .keys(this.props.entries)
          .map(key => <Entry key={key} index={key}
            entryInfo={this.props.entries[key]} />)
        }
      </div>
    );
  }
}

export default EntryWrapper;
