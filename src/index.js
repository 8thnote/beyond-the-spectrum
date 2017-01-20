import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import App from './App';
import NotFound from './NotFound';

import './css/main.css';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match pattern="/" component={App} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

render(<Root/>, document.querySelector('#main'));
