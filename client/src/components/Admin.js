import React, { Component } from 'react';
import axios from 'axios';

import EntryWrapper from './EntryWrapper';

import './Admin.css';

class Admin extends Component {
  constructor() {
    super();

    this.state = {
      results: '',
      entries: []
    }

    this.callApi = this.callApi.bind(this);
  }

  componentDidMount() {
    this.callApi()
      .then(resp => this.setState({
        results: resp.totalResults,
        entries: resp.articles
      }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await axios('/api');
    const body = await response.data;
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return (
      <div className="Admin">
        <header className="Admin-header">
          <h1 className="Admin-title">A1: NewsFeed</h1>
        </header>
        <EntryWrapper entries={this.state.entries}/>
      </div>
    );
  }
}

export default Admin;
