import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import configureStore from './state/store';
// Containers
import DefaultLayout from './containers/DefaultLayout';

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
