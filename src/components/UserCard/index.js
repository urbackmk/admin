import React from 'react';
import {
  Card,
  Button,
} from 'antd';

import {
  ACCESS_LEVELS_MAP
} from '../../constants';

const {
  Meta,
} = Card;

export default class UserCard extends React.Component {

    renderPendingActions() {
        const {
            approve,
            reject,
            user,
            uid,
        } = this.props;
        return [
                    <Button key="delete-button" type="danger" icon="delete" onClick={() => reject(uid)}>Reject</Button>,
                    <Button key="approve-button" type="primary" icon="check" onClick={() => approve(uid, user.accessLevel)}>Approve</Button>
                ]
    }

    render() {
        const {
          user,
        } = this.props;
        return (
            <Card 
                key={user.uid}
                className="event-card"
                extra={(<Button icon="email" href={`mailto:${user.email}`}>Email</Button>)}
                actions={ this.renderPendingActions() }
                title={user.username}
            >
                <Meta
                    title={user.email || ''}
                    description={user.notes}
                />
                <p>Requesting access to: {ACCESS_LEVELS_MAP[user.accessLevel]}</p>
               
      </Card>)
    }

}
