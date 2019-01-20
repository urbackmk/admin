import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import {
  ListGroup,
  ListGroupItem
} from 'reactstrap';

import eventsStateBranch from '../../state/event/index.js';

import EventCard from '../../components/EventCard';

class EventList extends React.Component {
    componentWillMount() {
        const { getCurrentLiveEvents } = this.props;
        console.log('get active')
        getCurrentLiveEvents();
    }
    render () {
        const {
          allCurrentEvents
        } = this.props;
        return (
            <ListGroup>
                {
                  map(allCurrentEvents, townHall => (
                        <EventCard 
                            townHall={townHall}
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
 
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
