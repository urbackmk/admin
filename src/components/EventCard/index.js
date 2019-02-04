import React from 'react';
import {
  Card,
  Button,
  Tag,
} from 'antd';

const {
  Meta
} = Card;

export default class EventCard extends React.Component {
    render() {
        const {
          townHall,
          archiveEvent,
          deleteEvent,
        } = this.props;
        return (
            <Card key={townHall.eventId}
                actions={[
                    <Button icon="edit">Edit (not functional yet)</Button>, 
                    <Button icon="export" onClick={archiveEvent}>Archive</Button>, 
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
                    <li><Tag color={townHall.dateValid ? "#2db7f5" : "#f50" }>{townHall.dateValid ? 'Date Valid' : 'Date not valid' }</Tag></li>
                    <li><Tag color={townHall.lat ?  "#2db7f5" : "#f50"}>Has geocode</Tag></li>
                </ul>
      </Card>)
    }
}