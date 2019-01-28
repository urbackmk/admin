import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import {
  ListGroup,
} from 'reactstrap';

import eventsStateBranch from '../../state/events';

import EventCard from '../../components/EventCard';
class EventList extends React.Component {
    componentWillMount() {
        const { getCurrentLiveEvents } = this.props;
        console.log('get active')
        getCurrentLiveEvents();
    }
    render () {
        const {
          allCurrentEvents,
          deleteEvent,
        } = this.props;
        return (
            <ListGroup>
                {
                  map(allCurrentEvents, townHall => (
                        <EventCard 
                            townHall={townHall}
                            deleteEvent={() => {
                                console.log('deleting')
                                return deleteEvent(townHall, 'townHalls')
                            }}
                        />
                ))}
            </ListGroup>
        )
    }
}

const mapStateToProps = state => ({
    allCurrentEvents: eventsStateBranch.selectors.getAllEvents(state),
});

const mapDispatchToProps = dispatch => ({
  getCurrentLiveEvents: () => dispatch(eventsStateBranch.actions.requestEvents()),
  deleteEvent: (id, path) => dispatch(eventsStateBranch.actions.deleteEvent(id, path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
