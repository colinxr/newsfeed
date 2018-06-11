import React, { Component } from 'react';
import axios from 'axios';

import './Post.css';
import Thumbnail from '../Thumbnail/Thumbnail';
import TagList from '../TagList/TagList';

class Post extends Component {
  constructor() {
    super();

    this.renderActionBar = this.renderActionBar.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete = (e) => {
    e.preventDefault();
    console.log('deleting');
    console.log(this.props.postInfo._id);
    const postID = this.props.postInfo._id;
    this.apiDelete(this.props.postInfo._id)
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
    const post = this.props.postInfo;
    let date = new Date(Date.parse(post.date));

    date = date.toDateString();

    return (
      <div className="post-entry">
        <header>
          <Thumbnail
            classname="post"
            location="frontPage"
            postUrl={ post.url }
            url={ post.urlToImage }
          />
          <h4>{ post.source }</h4>
          <h2 className="post-entry__title post-title"><a href={ post.url } target="_blank" className="post-entry__title-link">{ post.title }</a></h2>
          <TagList tags={ post.entities } />
          <span className="post-entry__date">{ date }</span>
        </header>
        <div className="post-entry__description">
          <p>{ post.description }</p>
        </div>
        { this.props.isLoggedIn ? this.renderActionBar() : '' }
      </div>
    );
  }
}

export default Post;
