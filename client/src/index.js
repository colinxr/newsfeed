import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './index.css';
import LandingPage from './components/LandingPage';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/admin" component={App} />
      </div>
    </BrowserRouter>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
