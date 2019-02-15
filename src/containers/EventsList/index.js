import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import {
  List, Radio, Row,
} from 'antd';

import eventsStateBranch from '../../state/events';
import selectionStateBranch from '../../state/selections'

import EventCard from '../../components/EventCard';
import { FEDERAL_STATE_RADIO_BUTTONS, PENDING_EVENTS_TAB, ARCHIVED_EVENTS_TAB } from '../../constants';

import './style.scss';
import LookupOldEvents from '../LookupOldEvents';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class EventList extends React.Component {
    constructor(props) {
        super(props);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount() {
        const {
          getCurrentLiveEvents,
          pathForEvents,
        } = this.props;
        console.log('path for events in component did mount', pathForEvents)
        if (pathForEvents) {
            getCurrentLiveEvents(pathForEvents);
        }
    }

    componentDidUpdate(prevProps) {
        const {
            getCurrentLiveEvents,
            pathForEvents,
        } = this.props;
        if (prevProps.pathForEvents !== pathForEvents && pathForEvents) {
            console.log('path for events in component did update', pathForEvents)
            getCurrentLiveEvents(pathForEvents);
        }
    }

    onRadioChange({target}) {
        const {
          changeRadioButton
        } = this.props;
        changeRadioButton(target.value)
    }

    renderItem(townHall) {
        const {
            archiveEvent,
            approveEvent,
            pathForArchive,
            pendingOrLive,
            deleteEvent,
            pathForEvents,
            pathForPublishing,
        } = this.props;
        return (
            <List.Item>
                <EventCard 
                    townHall={townHall}
                    pending={pendingOrLive === PENDING_EVENTS_TAB}
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
                />
            </List.Item>
        )
    }

    render () {
        const {
            eventsForList,
            pendingOrLive
        } = this.props;
        console.log(pendingOrLive)

        return pendingOrLive === ARCHIVED_EVENTS_TAB ? 
        (<LookupOldEvents
        />)
        :
        (
            <React.Fragment>
                <Row
                    type="flex"
                    justify="center"
                >
                    <RadioGroup 
                        defaultValue={FEDERAL_STATE_RADIO_BUTTONS[0]}
                        buttonStyle="solid"
                        onChange={this.onRadioChange}
                        >
                        {map(FEDERAL_STATE_RADIO_BUTTONS, (key) => {
                            return (
                                <RadioButton key={key} value={key}>{key}</RadioButton>
                            )
                        })
                        }
                    </RadioGroup>
                </Row>
                <List   
                    className='event-list'              
                    dataSource={eventsForList}
                    renderItem={this.renderItem}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    pendingOrLive: selectionStateBranch.selectors.getPendingOrLiveTab(state),
    eventsForList: eventsStateBranch.selectors.allEventsAsList(state),
    pathForEvents: selectionStateBranch.selectors.getEventsToShowUrl(state),
    pathForArchive: selectionStateBranch.selectors.getArchiveUrl(state),
    pathForPublishing: selectionStateBranch.selectors.getLiveEventUrl(state),
    userSubmissionPath: selectionStateBranch.selectors.getSubmissionUrl(state),
});

const mapDispatchToProps = dispatch => ({
    archiveEvent: (townHall, path, archivePath) => dispatch(eventsStateBranch.actions.archiveEvent(townHall, path, archivePath)),
    approveEvent: (townHall, path, livePath) => dispatch(eventsStateBranch.actions.approveEvent(townHall, path, livePath)),
    getCurrentLiveEvents: (path) => dispatch(eventsStateBranch.actions.requestEvents(path)),
    deleteEvent: (townHall, path) => dispatch(eventsStateBranch.actions.deleteEvent(townHall, path)),
    changeRadioButton: (value) => dispatch(selectionStateBranch.actions.changeFederalStateRadio(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
