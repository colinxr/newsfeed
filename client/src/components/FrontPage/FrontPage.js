import React from 'react';
import axios from 'axios';
import { authenticateUser } from '../../helpers';

import './FrontPage.css';

import FeaturedPost from '../FeaturedPost/FeaturedPost';
import Post from '../Post/Post';

class FrontPage extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: false,
      posts: [],
      featured: [],
    }
		
		this.setLogIn = this.setLogIn.bind(this);
    this.getFrontPagePosts = this.getFrontPagePosts.bind(this);
		this.setPosts = this.setPosts.bind(this);
    this.removePost = this.removePost.bind(this);
  }

  componentDidMount() {
		authenticateUser() ? this.setLogIn() : '';

    this.getFrontPagePosts()
      .then(resp => {
				const posts = resp;
        const featured = posts.shift();
        this.setPosts(posts, featured);
      })
      .catch(err => console.log(err));
  }

	setLogIn() {
		console.log('logging in');
		this.setState({ isLoggedIn: true, });
	}

	setPosts(posts, featured) {
		this.setState({
			posts,
			featured,
		});
	}

  getFrontPagePosts = async () => {
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
    const { posts, featured, isLoggedIn } = this.state;

    return (
      <div>
        <header className="header--main">
          <div className="header__wrapper">
            <h2><a href="/newsfeed/admin">This is A1</a></h2>
          </div>
        </header>
        <div className="wrapper wrapper--front-page">
					{
						featured ?  <FeaturedPost isLoggedIn={isLoggedIn} featuredPost={featured} removePost={this.removePost} /> : ''
				 }
          <div className="wrapper--front-page__posts">
            {
              Object
              .keys(posts)
              // .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map(key => <Post key={posts[key]._id} index={key} isLoggedIn={isLoggedIn}  postInfo={posts[key]} removePost={this.removePost}/>)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default FrontPage;
