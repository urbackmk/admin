import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import {
  ListGroup,
  ListGroupItem
} from 'reactstrap';

import eventsStateBranch from '../../state/events';

import EventCard from '../../components/EventCard';

class PendingList extends React.Component {
    componentWillMount() {
        const {
          getCurrentPendingEvents
        } = this.props;
        console.log('get pending')
        getCurrentPendingEvents();
    }
    render () {
        const {
          allCurrentEvents
        } = this.props;
        return (
            <ListGroup>
                {
                  allCurrentEvents.length > 0 ?
                  map(allCurrentEvents, townHall => (
                        <EventCard 
                            townHall={townHall}
                        />
                )) : <div>
                    No events to approve
                </div>}
            </ListGroup>
        )
    }
}

const mapStateToProps = state => ({
    allCurrentEvents: eventsStateBranch.selectors.getAllPendingEvents(state),
});

const mapDispatchToProps = dispatch => ({
  getCurrentPendingEvents: () => dispatch(eventsStateBranch.actions.requestPendingEvents()),
 
});

export default connect(mapStateToProps, mapDispatchToProps)(PendingList);
