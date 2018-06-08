import React from 'react';
import axios from 'axios';

import './FrontPage.css';

import FeaturedPost from '../FeaturedPost/FeaturedPost';
import Post from '../Post/Post';

class FrontPage extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      featured: [],
    }

    this.callApi = this.callApi.bind(this);
    this.removePost = this.removePost.bind(this);
  }

  componentDidMount() {
    this.callApi()
      .then(resp => {
        const featured = resp.shift();
        this.setState({
          posts: resp,
          featured: featured
        });
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await axios(`${process.env.REACT_APP_API_URL}/api/posts`);
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
    const {posts, featured} = {...this.state};

    return (
      <div>
        <header className="header--main">
          <div className="header__wrapper">
            <h2><a href="/newsfeed/admin">This is A1</a></h2>
          </div>
        </header>
        <div className="wrapper wrapper--front-page">
          <FeaturedPost featuredPost={this.state.featured} removePost={this.removePost} />
          <div className="wrapper--front-page__posts">
            {
              Object
              .keys(posts)
              // .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map(key => <Post key={key} index={key} postInfo={this.state.posts[key]} removePost={this.removePost}/>)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default FrontPage;
