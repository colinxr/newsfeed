import React, { Component } from 'react';
import axios from 'axios';

import './StoriesPage.css';
import Post from '../Post/Post';

class StoriesPage extends Component {
  constructor() {
    super();

    this.state = {
      tag: '',
      tagName: '',
      posts: []
    }

    this.getPostsByTag = this.getPostsByTag.bind(this);
    this.removePost = this.removePost.bind(this);
  }

  componentDidMount() {
    const loc = this.props.location.pathname
    const tag = loc.substr(loc.lastIndexOf('/') + 1);
    const tagName = tag
      .split('-')
      .map(el => el = el.charAt(0).toUpperCase() + el.substr(1))
      .join(' ');
    
    this.setState({ 
      tag,
      tagName
    });
    
    this.getPostsByTag(tag)
      .then(resp => {
        this.setState({ posts: resp });
      })
      .catch(err => console.log(err));
  }

  getPostsByTag = async (tag) => {
    const response = await axios(`/api/posts/${tag}`);
    const body = await response.data;
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  removePost(postID) {
    const posts = {...this.state.posts};
    // creates new object without the post that was just deleted
    const filteredPosts = Object
      .keys(posts)
      .slice(0, 9)
      .filter(key => {
        if (posts[key]._id !== postID) return posts[key];
      })
      .map(key => posts[key]);

    this.setState({ posts: filteredPosts });
  }

  render() {
    const posts = this.state.posts;
    console.log(this.props.location);

    return (
      <div>
        <h1><a href="/">This is A1</a></h1>
        <h4>Because you shouldn't get your news from Facebook</h4>
        <div className="wrapper wrapper--stories-page">
          <h2>{this.state.tagName}</h2>
          <div className="wrapper--stories__posts">
            {
              Object
              .keys(posts)
              //.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map(key => <Post key={key} index={key}
                postInfo={this.state.posts[key]} removePost={this.removePost}/>)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default StoriesPage;
