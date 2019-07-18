import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Comment, Card } from 'antd';
import { map } from 'lodash';
import smsUsersStateBranch from '../../state/sms-users';

class SmsUsersDashboard extends Component {
    componentDidMount() {
        const { requestTotalCount, requestCache } = this.props;
        requestTotalCount();
        requestCache();
    }

    render() {
        const { userCache } = this.props;
        return (
            <React.Fragment>
                <div>Total number of sms users: {this.props.totalSmsUsers}</div>
                <List
                    className="comment-list"
                    header={`${userCache.length} replies`}
                    itemLayout="horizontal"
                    dataSource={userCache}
                    renderItem={item => (
                        <li>
                            <Card
                                title={item.phoneNumber}
                            >

                            {map(item.messages, message => 
                                <Comment
                                    actions={item.actions}
                                    author={message.from_user? item.phoneNumber : 'THP'}
                                    content={message.body}
                                    datetime={item.last_updated}
                                />
                            )}
                            </Card>
                        </li>
                    )}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    totalSmsUsers: smsUsersStateBranch.selectors.getTotalSMSUsers(state),
    userCache: smsUsersStateBranch.selectors.getUserCache(state),
});

const mapDispatchToProps = dispatch => ({
    requestTotalCount: () => dispatch(smsUsersStateBranch.actions.requestTotalCount()),
    requestCache: () => dispatch(smsUsersStateBranch.actions.requestCache()),
});


export default connect(mapStateToProps, mapDispatchToProps)(SmsUsersDashboard);