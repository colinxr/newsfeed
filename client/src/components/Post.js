import React, { Component } from 'react';
import axios from 'axios';

import './Post.css';
import Thumbnail from './Thumbnail';

class Post extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete = (e) => {
    e.preventDefault();
    console.log(e);
    console.log('deleting');
    console.log(this.props.postInfo._id);
    this.apiDelete(this.props.postInfo._id)
      .then(e => {
        console.log(e);
        //this.props.removePost(e)
      });
  }

  apiDelete = async(postID, e) => {
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
          <Thumbnail
            classname="post"
            location="frontPage"
            postUrl={post.url}
            url={post.urlToImage}
          />
          <h4>{post.source}</h4>
          <h2 className="post-entry__title post-title"><a href={post.url} className="post-entry__title-link">{post.title}</a></h2>
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
