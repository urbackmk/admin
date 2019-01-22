import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppFooter,
  AppHeader,
} from '@coreui/react';
// sidebar nav config
// import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import firebase, {
  auth,
  provider
} from '../../utils/firebaseinit';

class DefaultLayout extends Component {
  constructor() {
      super();
      this.login = this.login.bind(this); // <-- add this line
      this.logout = this.logout.bind(this); // <-- add this line
      this.state = {
        currentItem: '',
        username: '',
        items: [],
        user: null 
      }
    }
    handleChange(e) {
      /* ... */
    }
    logout() {
      // we will add the code for this in a moment, but need to add the method now or the bind will throw an error
    }
    login() {
      auth.signInWithPopup(provider)
        .then((result) => {
          const user = result.user;
          this.setState({
            user
          });
        });
    }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
        <div className="wrapper">
        {this.state.user ?
            <button onClick={this.logout}>Log Out</button>                
            :
            <button onClick={this.login}>Log In</button>              
          }
        </div>
          <main className="main">
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  },
                )}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
          <AppAside fixed>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
