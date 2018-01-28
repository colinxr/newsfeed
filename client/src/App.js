import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.callApi = this.callApi.bind(this);

    this.state = {
      results: '',
      posts: []
    }
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({
        results: res.totalResults,
        posts: res.articles
      }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api');
    console.log(response);
    const body = await response.json();
    console.log(body);

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">NewsFeed</h1>
        </header>
        <p className="App-intro">Total Results: {this.state.results}</p>
      </div>
    );
  }
}

export default App;
