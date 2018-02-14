import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './index.css';
import RegisterPage from './components/RegisterPage/RegisterPage';
import FrontPage from './components/FrontPage/FrontPage';
import Admin from './components/Admin/Admin';
import registerServiceWorker from './registerServiceWorker';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={FrontPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/admin" component={Admin} />
      </div>
    </BrowserRouter>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
