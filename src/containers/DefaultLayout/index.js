import React, { Component } from 'react';
import {
  connect
} from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  Button,
  Layout,
  Modal,
} from 'antd';



import {
  AppAside,
  AppFooter,
  AppHeader,
} from '@coreui/react';

import userStateBranch from '../../state/users'

import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './Nav';
import {
  auth,
  provider
} from '../../utils/firebaseinit';

const {
  Header,
  Footer,
  Sider,
  Content,
} = Layout;

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
        confirmLoading: true,
      }
    }

    componentDidMount() {
      const {
        getUserById
      } = this.props;
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.setState({
              user,
              confirmLoading: false,
            });
            getUserById(user.uid)
          } else {
            this.setState({
              confirmLoading: false,
            });
          }
      });
      // if no user after 3 seconds, stop loading icon
      setTimeout(() => {
        this.setState({
          confirmLoading: false,
        });
      }, 5000);
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
      this.setState({
        loading: true,
      })
      auth.signInWithRedirect(provider)
      auth.getRedirectResult()
        .then((result) => {
          const user = result.user;
          if (user) {
            this.setState({
              user
            });
            getUserById(user.id)
          }
        });
    }

    renderAdminApp() {
      return (
        <Layout>
          <Sider> <DefaultHeader /></Sider>
          <Layout>
            <Header>Header</Header>
            <Content>       
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
            </Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      )
    }

    renderModal() {
      return (<Modal
              title="Town Hall Project Admin"
              visible={!this.state.user}
              onOk={this.login}
              okType="Log In"
              onCancel={this.handleCancel}
              confirmLoading={this.state.confirmLoading}
            >
            </Modal>
            )
    }

    renderLoadingApp() {
      return  (<Modal
              title="Town Hall Project Admin"
              visible={!this.state.user}
              onOk={this.login}
              okText="Log In"
              onCancel={this.handleCancel}
              confirmLoading={this.state.confirmLoading}
            >
              {this.state.confirmLoading ? <p>Checking login status</p> : <p>Login in to view admin site</p>}
            </Modal>
            )
         
    }

  render() {
    const {
      user
    } = this.props;
    return (
      <div className="app">
        <div className="app-body">
        <div className="wrapper">
        {this.state.user ?
            <button onClick={this.logout}>Log Out</button>                
            :  <button onClick={this.login}>Log In</button>       
          }
        </div>
          <main className="main">
           {this.state.user && user && user.isAdmin ?
            
            this.renderAdminApp() : this.renderLoadingApp()
            }
          </main>
  
        </div>
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
