import React from 'react';
import {
  connect
} from 'react-redux';
import {
  Button,
  Tag,
} from 'antd';
import {
  map,
} from 'lodash';
import {
  CSVLink,
} from "react-csv";

import selectionStateBranch from '../../state/selections';
import eventStateBranch from '../../state/events';

import FederalStateRadioSwitcher from '../../components/FederalStateRadioSwitcher';

class RSVPTable extends React.Component {

    render() {
        const {
            changeOldEventsLookupFederalState,
            allOldEvents,
            requestOldEvents,
            archiveUrl,
        } = this.props;
        return (    
            <div>
                <FederalStateRadioSwitcher 
                    changeRadioButton={changeOldEventsLookupFederalState}
                />
                <Button
                    onClick={() => requestOldEvents(archiveUrl)}
                >Request events</Button>
                {allOldEvents.length &&
                    <Button 
                        icon="download"
                    >
                        <CSVLink 
                            data = {
                            allOldEvents
                            }
                            filename="archiveUrl.csv"
                        > DownloadEvents
                        </CSVLink>
                    </Button>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    archiveUrl: selectionStateBranch.selectors.getArchiveUrl(state),
    allOldEvents: eventStateBranch.selectors.getAllOldEventsAsList(state),
});

const mapDispatchToProps = dispatch => ({
    requestOldEvents: (path) => dispatch(eventStateBranch.actions.requestOldEvents(path)),
    changeOldEventsLookupFederalState: (value) => dispatch(selectionStateBranch.actions.changeOldEventsLookupFederalState(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RSVPTable);
