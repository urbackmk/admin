import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import configureStore from './state/store';
import './App.css';

// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'

// Containers
import { DefaultLayout } from './containers';

// Bootstrap the store
var Store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <HashRouter>
          <Switch>
            <Route path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
