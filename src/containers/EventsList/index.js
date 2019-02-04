import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import {
  List,
} from 'antd';

import eventsStateBranch from '../../state/events';
import selectionStateBranch from '../../state/selections'

import EventCard from '../../components/EventCard';
class EventList extends React.Component {
    componentWillMount() {
        const { getCurrentLiveEvents } = this.props;
        getCurrentLiveEvents();
    }
    render () {
        const {
          eventsForList,
          deleteEvent,
        } = this.props;
        return (
            <List
                dataSource={eventsForList}
                renderItem={townHall => (
                        <EventCard 
                            townHall={townHall}
                            deleteEvent={() => {
                                console.log('deleting')
                                return deleteEvent(townHall, 'townHalls')
                            }}
                        />
                )}
            />
        )
    }
}

const mapStateToProps = state => ({
    eventsForList: selectionStateBranch.selectors.getEventsForTab(state),
});

const mapDispatchToProps = dispatch => ({
  getCurrentLiveEvents: () => dispatch(eventsStateBranch.actions.requestEvents()),
  deleteEvent: (id, path) => dispatch(eventsStateBranch.actions.deleteEvent(id, path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
