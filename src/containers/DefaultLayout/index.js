import React, { Component } from 'react';
import {
  connect
} from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppFooter,
  AppHeader,
} from '@coreui/react';

import userStateBranch from '../../state/users'

import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import {
  auth,
  provider
} from '../../utils/firebaseinit';

class DefaultLayout extends Component {
  constructor() {
      super();
      this.login = this.login.bind(this); 
      this.logout = this.logout.bind(this); 
      this.state = {
        currentItem: '',
        username: '',
        items: [],
        user: null,
      }
    }

    componentDidMount() {
      const {
        getUserById
      } = this.props;
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.setState({
              user
            });
            getUserById(user.uid)
          }
      });
    }

    handleChange(e) {
      /* ... */
    }

    logout() {
      auth.signOut()
        .then(() => {
          this.setState({
            user: null
          });
        });
    }

    login() {
         const {
           getUserById
         } = this.props;
      auth.signInWithPopup(provider)
        .then((result) => {
          const user = result.user;
          this.setState({
            user
          });
          getUserById(user.id)
        });
    }

  render() {
    const {
      user
    } = this.props;
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
            {user && user.isAdmin ?
            
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
            </Container> : null
            }
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

const mapStateToProps = state => ({
  user: userStateBranch.selectors.getUser(state),
});

const mapDispatchToProps = dispatch => ({
  getUserById: (id) => dispatch(userStateBranch.actions.requestUserById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
