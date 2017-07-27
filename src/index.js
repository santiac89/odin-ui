import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider>
      <Route path="/" component={App}/>
    </MuiThemeProvider>
  </BrowserRouter>, document.getElementById('root'));

registerServiceWorker();
