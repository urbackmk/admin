import React from 'react';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  ButtonGroup,
} from 'reactstrap';

export default class EventCard extends React.Component {
    render() {
        const {
          townHall,
          deleteEvent,
        } = this.props;
        return (
            <Card key={townHall.eventId}>
            <CardBody>
            <CardTitle>{townHall.eventType} {townHall.displayName} {townHall.party} {townHall.state} {townHall.district}</CardTitle>
            <CardSubtitle>{townHall.dateString} at {townHall.Time} {townHall.timeZone}</CardSubtitle>
            <CardText>{townHall.address}</CardText>
            <ButtonGroup>
                <Button
                     color="info"
                >Edit</Button>
                <Button
                    color="warning"
                >Archive</Button>
                <Button
                    color="danger"
                    onClick={deleteEvent}
                >Delete</Button>
            </ButtonGroup>
            </CardBody>
      </Card>)
    }
}