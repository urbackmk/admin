import React from 'react';
import {
  List, 
} from 'antd';

import EventCard from '../../components/EventCard';


class EventList extends React.Component {
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }

    renderItem(townHall) {
        const {
            archiveEvent,
            approveEvent,
            pathForArchive,
            pending,
            deleteEvent,
            pathForEvents,
            pathForPublishing,
            updateEvent,
        } = this.props;
        return (
            <List.Item>
                <EventCard 
                    townHall={townHall}
                    pending={pending}
                    approveEvent={() => {
                        return approveEvent(townHall, pathForEvents, pathForPublishing)
                    }}
                    archiveEvent={() => {
                        console.log('archiving')
                        return archiveEvent(townHall, pathForEvents, pathForArchive)
                    }}
                    deleteEvent={() => {
                        console.log('deleting')
                        return deleteEvent(townHall, pathForEvents)
                    }}
                    updateEvent={(newData) => {
                        console.log('updating')
                        return updateEvent(newData, pathForEvents, townHall.eventId)
                    }}
                />
            </List.Item>
        )
    }

    render () {
        const {
            eventsForList,
        } = this.props;

        return (
            <React.Fragment>
                <List   
                    className='event-list'              
                    dataSource={eventsForList}
                    renderItem={this.renderItem}
                />
            </React.Fragment>
        )
    }
}

export default EventList;
