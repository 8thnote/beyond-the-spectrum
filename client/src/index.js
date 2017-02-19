import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  fontFamily: "'Open Sans', sans-serif",
  palette: {
    primary1Color: "#289a72"
  }
});

import MasterLayout from './components/layout/component.layout.master';
// import NotFound from './NotFound';

import 'font-awesome/css/font-awesome.css';
import './css/main.css';

const Root = () => {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router>
        <div>
          <Route path="/" component={MasterLayout} />
        </div>
      </Router>
    </MuiThemeProvider>
  )
}

render(<Root/>, document.querySelector('#main'));
