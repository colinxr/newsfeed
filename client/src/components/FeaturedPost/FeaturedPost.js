import React, { Component } from 'react';
import axios from 'axios';

import './FeaturedPost.css';

import Thumbnail from '../Thumbnail/Thumbnail';

class FeaturedPost extends Component {
  constructor() {
    super();

    this.renderActionBar = this.renderActionBar.bind(this);
    this.handleDelete 	 = this.handleDelete.bind(this);
    this.apiDelete 			 = this.apiDelete.bind(this);
  }

  handleDelete = (e) => {
    e.preventDefault();
    console.log('deleting');
    const postID = this.props.featuredPost._id;
    this.apiDelete(postID)
      .then(e => this.props.removePost(postID));
  }

  apiDelete = async(postID, e) => {
    const response = await axios.delete(`/api/posts/${postID}`);
    const body = await response.data;

    if (response.status !== 200) throw Error(body.message);
    this.setState({
      post: null,
      message: response.data.message
    });
  }

  renderActionBar() {
    return (
      <div className="post-entry__action-bar">
        <span className="post-entry__action-bar__delete" onClick={ (e) => this.handleDelete(e) }>Delete Story</span>
      </div>
    )
  }

  render() {
    const { featuredPost, isLoggedIn} = this.props.featuredPost;
    return(
      <div className="featured-post">
        <div className="featured-post__img">
          <Thumbnail
            classname="post"
            location="frontPage"
            postUrl={ featuredPost.url }
            url={ featuredPost.urlToImage }
          />
        </div>
        <div className="featued-post__content">
          <h4>{ featuredPost.source }</h4>
          <h2 className="post-entry__title post-title"><a href={ featuredPost.url } target="_blank" className="post-entry__title-link">{ featuredPost.title }</a></h2>
          <div className="post-entry__description">
            <p>{ featuredPost.description }</p>
          </div>
          { isLoggedIn ? this.renderActionBar() : '' }
        </div>
      </div>
    )
  }
}

export default FeaturedPost;
