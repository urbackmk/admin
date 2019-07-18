import React from 'react';
import { Card, Comment, Avatar } from 'antd';
import { map } from 'lodash';
import moment from 'moment';
import { firebasedb } from '../../utils/firebaseinit';

import Editor from '../Editor';
const initialState = {
    submitting: false,
    editing: false,
}

export default class SmsCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState
        this.startEditing = this.startEditing.bind(this);
        this.stopEditing = this.stopEditing.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { item, receiveMessage } = this.props;

        firebasedb.ref(`sms-users/user-cache/${item.phoneNumber}`).child('messages').on('child_added', (snapshot) => {
            receiveMessage({ from: item.phoneNumber, message: snapshot.val() });
        })

    }

    componentWillUnmount() {
        const { item } = this.props;

        firebasedb.ref(`sms-users/user-cache/${item.phoneNumber}`).child('messages').off('child_added')
    }

    componentDidUpdate(prevProps, prevState) {
        const { item } = this.props;
        if (item.messages.length > prevProps.item.messages.length && this.state.submitting) {
            this.setState({
                submitting: false,
            })
        }
    }

    startEditing() {
        this.setState({
            editing: true,
        })
    }

    stopEditing() {
        this.setState({
            editing: false,
        })
    }

    handleChange(e) {
        console.log(e.target.value)
        this.setState({ replyValue: e.target.value })
    }


    handleSubmit() {
        const { sendMessage, item } = this.props;
        const { replyValue } = this.state;

        sendMessage({ to: item.phoneNumber, body: replyValue })
        this.setState({ submitting: true, editing: false })
    }

    render() {
        const { item } = this.props;
        const { replyValue, submitting, editing} = this.state;
        const startEditActions = [
            <span onClick={this.startEditing}>Reply</span>,
        ]
        const isEditingAction = [
            <span onClick={this.stopEditing}>Cancel</span>,
        ]
        const actions = editing ? isEditingAction : startEditActions
        return (
            <Card
                title={item.phoneNumber}
            >

                {map(item.messages, (message, index) =>
                    <Comment
                        actions={index === item.messages.length - 1 ? 
                            actions : []}
                        author={message.from_user ? item.phoneNumber : 'THP'}
                        content={message.body}
                        datetime={moment(message.time_stamp).fromNow()}
                        key={message.id}
                        avatar={
                            <Avatar
                                src={message.from_user ? '' : "https://townhallproject.com/Images/capital-01.png"}
                                alt="Town Hall Project"
                            />
                        }
                    />
                )}
                {this.state.editing &&
                    <Comment
                        avatar={
                            <Avatar
                            src="https://townhallproject.com/Images/capital-01.png"
                                alt="Town Hall Project"
                            />
                        }
                        content={
                            <Editor
                                onChange={this.handleChange}
                                onSubmit={this.handleSubmit}
                                submitting={submitting}
                                value={replyValue}
                            />
                        }
                    />}
            </Card>
        )
    }
}