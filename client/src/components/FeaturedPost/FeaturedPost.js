import React, { Component } from 'react';
import axios from 'axios';

import './FeaturedPost.css';

import Thumbnail from '../Thumbnail/Thumbnail';

class FeaturedPost extends Component {
  constructor() {
    super();
  }

  render() {
    const featuredPost = this.props.featuredPost;
    return(
      <div className="featured-post">
        <div className="featured-post__img">
          <Thumbnail
            classname="post"
            location="frontPage"
            postUrl={featuredPost.url}
            url={featuredPost.urlToImage}
          />
        </div>
        <div className="featued-post__content">
          <h4>{featuredPost.source}</h4>
          <h2 className="post-entry__title post-title"><a href={featuredPost.url} className="post-entry__title-link">{featuredPost.title}</a></h2>
          <div className="post-entry__description">
            <p>{featuredPost.description}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default FeaturedPost;
