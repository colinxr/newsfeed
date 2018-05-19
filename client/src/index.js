import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './index.css';
import RegisterPage from './components/RegisterPage/RegisterPage';
import FrontPage from './components/FrontPage/FrontPage';
import StoriesPage from './components/StoriesPage/StoriesPage';
import Admin from './components/Admin/Admin';

const Root = () => {
  return (
    <BrowserRouter basename="/newsfeed">
      <div>
        <Route exact path="/" component={FrontPage} />
        <Route exact path="/stories/:tag" component={StoriesPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/admin" component={Admin} />
      </div>
    </BrowserRouter>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
