import React from 'react';
import {
  Card,
  Button,
} from 'antd';

const {
  Meta
} = Card;

export default class EventCard extends React.Component {
    render() {
        const {
          townHall,
          deleteEvent,
        } = this.props;
        return (
            <Card key={townHall.eventId}
                actions={[
                    <Button icon="edit">Edit (not functional yet)</Button>, 
                    <Button icon="export">Archive</Button>, 
                    <Button type="danger" icon="delete" onClick={deleteEvent}>Delete</Button>]}

            >
               <Meta
                title={`${townHall.displayName || townHall.Member} (${townHall.party}) ${townHall.state} ${townHall.district || ''}`}
                description={townHall.meetingType}
                />
                <p>{townHall.reapeatingEvent ? `${townHall.repeatingEvent}` : `${townHall.dateString} at ${townHall.Time} ${townHall.timeZone}`}</p>
                <p>{townHall.address}</p>
                <ul>Meta data (not shown)
                    <li>Event id: {townHall.eventId}</li>
                    <li>Chamber: {townHall.chamber}</li>
                    <li>Entered by: {townHall.enteredBy}</li>
                    <li>{`Date valid: ${townHall.dateValid}`}</li>
                    <li>{`Has been geocoded: ${!!townHall.lat}`}</li>
                </ul>
      </Card>)
    }
}