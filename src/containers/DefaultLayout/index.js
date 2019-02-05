import React, { Component } from 'react';
import {
  connect
} from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import {
  Layout,
  Modal,
} from 'antd';

import userStateBranch from '../../state/users'
import selectionStateBranch from '../../state/selections'

import routes from '../../routes';
import AppHeader from './Header';
import SideNav from './SideNav';
import {
  auth,
  provider
} from '../../utils/firebaseinit';

const {
  Header,
  Sider,
  Content,
} = Layout;


class DefaultLayout extends Component {
  constructor() {
      super();
      this.login = this.login.bind(this); 
      this.logOut = this.logOut.bind(this);
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

    logOut() {
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
      const {
        user,
        activeEventTab,
        changeActiveEventTab,
      } = this.props;
      return (
        <Layout>
          <Header>
              <AppHeader 
                userName={user.username}
                logOut={this.logOut}
              />
            </Header>
          <Layout>
              <Sider
                width={300}
              > 
                <SideNav 
                    handleChangeTab={changeActiveEventTab}
                    activeEventTab={activeEventTab}
                />
              </Sider>
              <Switch>
                <Content>       
                  {routes.map((route, idx) => {
                      return route.component ? (
                      <Route 
                        key={idx} 
                        path={route.path} 
                        exact={route.exact} 
                        name={route.name} 
                        render={props => (
                          <route.component {...props} />
                        )} />)
                        : null
                    },
                  )}
                </Content>
              </Switch>
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
    return this.state.user && user && user.isAdmin ? this.renderAdminApp() : this.renderLoadingApp();
  }
}

const mapStateToProps = state => ({
  user: userStateBranch.selectors.getUser(state),
  activeEventTab: selectionStateBranch.selectors.getPendingOrLiveTab(state)
});

const mapDispatchToProps = dispatch => ({
  getUserById: (id) => dispatch(userStateBranch.actions.requestUserById(id)),
  changeActiveEventTab: (tab) => dispatch(selectionStateBranch.actions.changeActiveEventTab(tab))
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
