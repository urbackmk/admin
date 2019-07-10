import React, { Component } from 'react';
import { connect } from 'react-redux';

import smsUsersStateBranch from '../../state/sms-users';

class SmsUsers extends Component {
  componentDidMount() {
    const { requestTotalCount } = this.props;
    requestTotalCount();
  }

  render() {
    return (
      <React.Fragment>
        <div>Total number of sms users: {this.props.totalSmsUsers}</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  totalSmsUsers: smsUsersStateBranch.selectors.getTotalSMSUsers(state),
});

const mapDispatchToProps = dispatch => ({
  requestTotalCount: () => dispatch(smsUsersStateBranch.actions.requestTotalCount()),
});


export default connect(mapStateToProps, mapDispatchToProps)(SmsUsers);