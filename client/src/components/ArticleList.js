import React, { Component } from 'react';

import FeedEntry from './FeedEntry';

class ArticleList extends Component {

  render() {
    return (
      <div className="feed-entries">
        {
          Object
          .keys(this.props.articles)
          .map(key => <FeedEntry key={key} index={key}
            articleInfo={this.props.articles[key]}
            sendToEditor={this.props.sendToEditor}/>)
        }
      </div>
    );
  }
}

export default ArticleList;
