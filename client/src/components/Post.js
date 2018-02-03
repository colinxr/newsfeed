import React, { Component } from 'react';
import axios from 'axios';

import './Post.css';

class Post extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete = (e) => {
    e.preventDefault();
    console.log('deleting');
    console.log(this.props.postInfo._id);
    this.apiDelete(this.props.postInfo._id);
    this.props.removePost(this.props.postInfo._id);
  }

  apiDelete = async(postID) => {
    const response = await axios.delete(`/api/posts/${postID}`);
    console.log(response);
    const body = await response.data;

    if (response.status !== 200) throw Error(body.message);
    this.setState({
      post: null,
      message: response.data.message
    });
  }

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
        <div className="post-entry__action-bar">
          <span className="post-entry__action-bar__delete" onClick={(e) => this.handleDelete(e)}>Delete Story</span>
        </div>
      </div>
    );
  }
}

export default Post;
