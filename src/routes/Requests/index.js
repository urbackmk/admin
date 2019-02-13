import React, { Component } from 'react';

import RequestList from '../../containers/RequestList';
class UserRequests extends Component {

  render() {
    return (
      <React.Fragment>
        <RequestList />
      </React.Fragment>
    );
  }
  
}

export default UserRequests;