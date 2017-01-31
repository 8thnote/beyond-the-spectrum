import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import MasterLayout from './components/layout/component.layout.master';
import NotFound from './NotFound';

import 'font-awesome/css/font-awesome.css';
import './css/main.css';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match pattern="/" component={MasterLayout} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

render(<Root/>, document.querySelector('#main'));
