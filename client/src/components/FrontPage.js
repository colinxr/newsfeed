import React from 'react';
import axios from 'axios';

import EntryWrapper from './EntryWrapper';

class FrontPage extends React.Component {
  constructor() {
    super();

    this.state = {
      stories: []
    }

    this.callApi = this.callApi.bind(this);
  }

  componentDidMount() {
    this.callApi()
      .then(resp => {
        console.log(resp);
        this.setState({ stories: resp });
      }).catch(err => {
        console.log(err);
      });
  }

  callApi = async () => {
    const response = await axios('/api/entries');
    const body = await response.data;
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return (
      <div>
        <h2>This is A1</h2>
        <h4>Because you shouldn't get your news from Facebook</h4>
        <EntryWrapper entries={this.state.stories}/>
      </div>

    )
  }
}

export default FrontPage;
