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

	componentDidMount() {

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
    const {postInfo, isLoggedIn} = this.props;
    let date = new Date(Date.parse(postInfo.date));
    date = date.toDateString();

    return (
      <div className="post-entry">
        <header>
          <Thumbnail
            classname="post"
            location="frontPage"
            postUrl={ postInfo.url }
            url={ postInfo.urlToImage }
          />
				<h4>{ postInfo.source }</h4>
          <h2 className="post-entry__title post-title"><a href={ postInfo.url } target="_blank" className="post-entry__title-link">{ postInfo.title }</a></h2>
          <TagList tags={ postInfo.entities } />
          <span className="post-entry__date">{ date }</span>
        </header>
        <div className="post-entry__description">
          <p>{ postInfo.description }</p>
        </div>
        { isLoggedIn ? this.renderActionBar() : '' }
      </div>
    );
  }
}

export default Post;
