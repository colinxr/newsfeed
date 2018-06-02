import React, { Component } from 'react';

import './TagList.css';

class TagList extends Component {

  render() {
    const tags = this.props.tags;

    return (
      <ul className="post-entry__tags">
        {
          tags.map(tag => {
            tag = tag.trim();
            let tagSlug = tag;

            if (tag.indexOf(' ')) tagSlug = tag.toLowerCase().split(' ').join('-').trim();

            return (
              <li key={tag}><a href={'/newsfeed/stories/' + tagSlug }>{tag.trim()}</a></li>
            );
          })
        }
      </ul>
    );
  }
}

export default TagList;
