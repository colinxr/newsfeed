import React from 'react';
import axios from 'axios';

import Post from './Post';

class FrontPage extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: []
    }

    this.callApi = this.callApi.bind(this);
    this.removePost = this.removePost.bind(this);
  }

  componentDidMount() {
    this.callApi()
      .then(resp => this.setState({ posts: resp }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await axios('/api/posts');
    const body = await response.data;
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  removePost(postID) {
    const posts = {...this.state.posts};
    // creates new object without the post that was just deleted
    const filteredPosts = Object.keys(posts)
      .filter(key => {
        if (posts[key]._id !== postID) return posts[key];
      })
      .map(key => posts[key]);

    this.setState({ posts: filteredPosts });
  }

  render() {
    const posts = {...this.state.posts};

    return (
      <div>
        <h2><a href="/admin">This is A1</a></h2>
        <h4>Because you shouldn't get your news from Facebook</h4>
        <div className="wrapper wrapper--front-page">
          {
            Object
            .keys(posts)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map(key => <Post key={key} index={key}
              postInfo={this.state.posts[key]} removePost={this.removePost}/>)
          }
        </div>
      </div>
    );
  }
}

export default FrontPage;
