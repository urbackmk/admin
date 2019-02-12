import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import {
  ListGroup,
} from 'reactstrap';

import userStateBranch from '../../state/users';

import UserCard from '../../components/UserCard';

class RequestList extends React.Component {
    componentWillMount() {
        const {
          requestCurrentPendingUsers
        } = this.props;
        requestCurrentPendingUsers();
    }
    render () {
        const {
          allPendingUserRequests,
          approveUserRequest,
        } = this.props;
        console.log(allPendingUserRequests)
        return (
            <ListGroup>
                {
                  allPendingUserRequests ?
                  map(allPendingUserRequests, (user, uid) => (
                        <UserCard
                            uid={uid}
                            user={user}
                            approve={approveUserRequest}
                        />
                )) : <div>
                    No users to approve
                </div>}
            </ListGroup>
        )
    }
}

const mapStateToProps = state => ({
    allPendingUserRequests: userStateBranch.selectors.getPendingUsers(state),
});

const mapDispatchToProps = dispatch => ({
    requestCurrentPendingUsers: () => dispatch(userStateBranch.actions.requestCurrentPendingUsers()),
    approveUserRequest: (uid, accessLevel) => dispatch(userStateBranch.actions.approveUserRequest(uid, accessLevel)),
    rejectUserRequest: (uid) => dispatch(userStateBranch.actions.rejectUserRequest(uid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestList);
