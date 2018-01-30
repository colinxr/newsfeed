import React, { Component } from 'react';

import './Post.css';

class Post extends Component {
  render() {
    const post = this.props.postInfo;

    return (
      <div className="post-entry">
        <header>
          <div className="post-entry__img-wrap">
            <a href={post.url} className="post-entry__title-link"><img src={post.urlToImage} alt="" className="post-entry__img" /></a>
          </div>
          <h2 className="post-entry__title post-title"><a href={post.url} className="post-entry__title-link">{post.title}</a></h2>
          <h4>{post.source.name}</h4>
        </header>
        <div className="post-entry__description">
          <p>{post.description}</p>
        </div>
      </div>
    );
  }
}

export default Post;
