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
        const { usersSentMessages, sendMessage, receiveMessage, usersWithReplies } = this.props;
        return (
            <React.Fragment>
                <div>Total number of sms users: {this.props.totalSmsUsers}</div>
                <List
                    className="comment-list"
                    header={`${usersSentMessages.length} replies`}
                    itemLayout="horizontal"
                    dataSource={usersWithReplies}
                    renderItem={item => (
                        <li key={item.phoneNumber}>
                            <SmsCard 
                                item={item}
                                key={`${item.phoneNumber}-card`}
                                sendMessage={sendMessage}
                                receiveMessage={receiveMessage}
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
    usersSentMessages: smsUsersStateBranch.selectors.getUsersWithMessages(state),
    usersWithReplies: smsUsersStateBranch.selectors.getUsersWithReplies(state),
});

const mapDispatchToProps = dispatch => ({
    requestTotalCount: () => dispatch(smsUsersStateBranch.actions.requestTotalCount()),
    requestCache: () => dispatch(smsUsersStateBranch.actions.requestCache()),
    sendMessage: (payload) => dispatch(smsUsersStateBranch.actions.sendMessage(payload)),
    receiveMessage: (payload) => dispatch(smsUsersStateBranch.actions.receiveMessage(payload))
});


export default connect(mapStateToProps, mapDispatchToProps)(SmsUsersDashboard);