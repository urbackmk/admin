import React, { Component } from 'react';
import { connect } from 'react-redux';
import  PropTypes from 'prop-types';

import {
    Layout,
} from 'antd';

import userStateBranch from '../../state/users';
import selectionStateBranch from '../../state/selections';

import AppHeader from '../DefaultLayout/Header';
import RsvpTable from '../RsvpTable';

const {
    Header,
    Content,
} = Layout;

class DownloadApp extends Component {

    render() {
      const {
        user,
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
                <Content>    
                    <RsvpTable
                    />
                </Content>
            </Layout>
        </Layout>
      )
    }

}

DownloadApp.propTypes = {
  activeEventTab: PropTypes.string.isRequired,
  changeActiveEventTab: PropTypes.func.isRequired,
  currentHashLocation: PropTypes.string.isRequired,
  getLocation: PropTypes.func.isRequired,
  getUserById: PropTypes.func.isRequired,
  user: PropTypes.shape({}),
}

const mapStateToProps = state => ({
  activeEventTab: selectionStateBranch.selectors.getPendingOrLiveTab(state),
  currentHashLocation: selectionStateBranch.selectors.getCurrentHashLocation(state),
  user: userStateBranch.selectors.getUser(state),
});

const mapDispatchToProps = dispatch => ({
  changeActiveEventTab: (tab) => dispatch(selectionStateBranch.actions.changeActiveEventTab(tab)),
  getLocation: () => dispatch(selectionStateBranch.actions.getHashLocationAndSave()),
  getUserById: (id, email, name) => dispatch(userStateBranch.actions.requestUserById(id, email, name)),
  submitRequestAccess: (user, values) => dispatch(userStateBranch.actions.submitRequestAccess(user, values))
});

export default connect(mapStateToProps, mapDispatchToProps)(DownloadApp);
