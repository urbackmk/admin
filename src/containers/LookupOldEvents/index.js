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

    componentDidMount() {
        const { 
            requestOldEvents,
            archiveUrl,
        } = this.props;
        requestOldEvents(archiveUrl);
    }

    componentDidUpdate(preProps) {
        const {
          requestOldEvents,
          archiveUrl,
        } = this.props;
        if (preProps.archiveUrl !== archiveUrl) {
            requestOldEvents(archiveUrl);
        }
    }

    render() {
        const {
            changeOldEventsLookupFederalState,
            allOldEvents
        } = this.props;
        return (    
            <div>
                <FederalStateRadioSwitcher 
                    changeRadioButton={changeOldEventsLookupFederalState}
                />
                {allOldEvents.length && 
                    <Button 
                        icon="download"
                    >
                        <CSVLink 
                            data = {
                            allOldEvents
                            }
                            filename="Current_RSVPs.csv"
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
    allOldEvents: eventStateBranch.selectors.allOldEventsAsList(state),
});

const mapDispatchToProps = dispatch => ({
    requestOldEvents: (path) => dispatch(eventStateBranch.actions.requestOldEvents(path)),
    changeOldEventsLookupFederalState: (value) => dispatch(selectionStateBranch.actions.changeOldEventsLookupFederalState(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RSVPTable);
