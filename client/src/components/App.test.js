import React from 'react';
import ReactDOM from 'react-dom';
import App from './Admin';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Admin />, div);
  ReactDOM.unmountComponentAtNode(div);
});
