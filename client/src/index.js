import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import MasterLayout from './components/layout/component.layout.master';
// import NotFound from './NotFound';

import 'font-awesome/css/font-awesome.css';
import './css/main.css';

const Root = () => {
  return (
    <Router>
      <div>
        <Route path="/" component={MasterLayout} />
      </div>
    </Router>
  )
}

render(<Root/>, document.querySelector('#main'));
