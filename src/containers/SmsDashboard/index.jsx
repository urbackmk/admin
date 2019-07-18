import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'antd';
import SmsCard from '../../components/SmsCard';

import smsUsersStateBranch from '../../state/sms-users';


class SmsUsersDashboard extends Component {

    componentDidMount() {
        const { requestTotalCount, requestCache } = this.props;
        requestTotalCount();
        requestCache();
    }

    render() {
        const { userCache, sendMessage } = this.props;
        return (
            <React.Fragment>
                <div>Total number of sms users: {this.props.totalSmsUsers}</div>
                <List
                    className="comment-list"
                    header={`${userCache.length} replies`}
                    itemLayout="horizontal"
                    dataSource={userCache}
                    renderItem={item => (
                        <li key={item.phoneNumber}>
                            <SmsCard 
                                item={item}
                                sendMessage={sendMessage}
                            />
                        </li>
                    )}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    totalSmsUsers: smsUsersStateBranch.selectors.getTotalSMSUsers(state),
    userCache: smsUsersStateBranch.selectors.getUsersWithMessages(state),
});

const mapDispatchToProps = dispatch => ({
    requestTotalCount: () => dispatch(smsUsersStateBranch.actions.requestTotalCount()),
    requestCache: () => dispatch(smsUsersStateBranch.actions.requestCache()),
    sendMessage: (payload) => dispatch(smsUsersStateBranch.actions.sendMessage(payload)),
});


export default connect(mapStateToProps, mapDispatchToProps)(SmsUsersDashboard);