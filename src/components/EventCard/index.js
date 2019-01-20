import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';

export default class EventCard extends React.Component {
    render() {
        const {townHall} = this.props;
        return (
            <Card key={townHall.eventId}>
            <CardBody>
            <CardTitle>{townHall.eventType} {townHall.displayName} {townHall.party} {townHall.state} {townHall.district}</CardTitle>
            <CardSubtitle>{townHall.dateString} at {townHall.Time} {townHall.timeZone}</CardSubtitle>
            <CardText>{townHall.address}</CardText>
            <Button>Edit</Button>
            </CardBody>
      </Card>)
    }
}