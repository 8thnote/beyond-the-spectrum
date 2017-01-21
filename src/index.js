import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import ResourcesPage from './components/pages/component.page.resources';
import NotFound from './NotFound';

import './css/main.css';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match pattern="/resources" component={ResourcesPage} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

render(<Root/>, document.querySelector('#main'));
