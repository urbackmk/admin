import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import {
  List, Radio,
} from 'antd';

import eventsStateBranch from '../../state/events';
import selectionStateBranch from '../../state/selections'

import EventCard from '../../components/EventCard';
import { FEDERAL_STATE_RADIO_BUTTONS } from '../../constants';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class EventList extends React.Component {
    constructor(props) {
        super(props);
        this.onRadioChange = this.onRadioChange.bind(this);
    }
    componentWillMount() {
        const {
          getCurrentLiveEvents,
          pathForEvents,
        } = this.props;

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
            getCurrentLiveEvents(pathForEvents);
        }
    }

    onRadioChange({target}) {
        const {
          changeRadioButton
        } = this.props;
        changeRadioButton(target.value)
    }

    render () {
        const {
            archiveEvent,
            pathForArchive,
            pendingOrLive,
            eventsForList,
            deleteEvent,
            pathForEvents,
        } = this.props;
        console.log(pathForArchive)
        return (
            <React.Fragment>
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
                <List
                    dataSource={eventsForList}
                    renderItem={townHall => (
                            <EventCard 
                                townHall={townHall}
                                pending={pendingOrLive}
                                archiveEvent={() => {
                                    console.log('archiving')
                                    return archiveEvent(townHall, pathForEvents, pathForArchive)
                                }}
                                deleteEvent={() => {
                                    console.log('deleting')
                                    return deleteEvent(townHall, pathForEvents)
                                }}
                            />
                    )}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    pendingOrLive: selectionStateBranch.selectors.getPendingOrLiveTab(state),
    eventsForList: eventsStateBranch.selectors.allEventsAsList(state),
    pathForEvents: selectionStateBranch.selectors.getEventUrl(state),
    pathForArchive: selectionStateBranch.selectors.getArchiveUrl(state),
});

const mapDispatchToProps = dispatch => ({
    archiveEvent: (townhall, path, archivePath) => dispatch(eventsStateBranch.actions.archiveEvent(townhall, path, archivePath)),
    getCurrentLiveEvents: (path) => dispatch(eventsStateBranch.actions.requestEvents(path)),
    deleteEvent: (townhall, path) => dispatch(eventsStateBranch.actions.deleteEvent(townhall, path)),
    changeRadioButton: (value) => dispatch(selectionStateBranch.actions.changeFederalStateRadio(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
