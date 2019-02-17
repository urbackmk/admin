import React from 'react';
import {
  connect
} from 'react-redux';
import {
  Button,
  DatePicker,
} from 'antd';
import {
  CSVLink,
} from "react-csv";

import selectionStateBranch from '../../state/selections';
import eventStateBranch from '../../state/events';

import FederalStateRadioSwitcher from '../../components/FederalStateRadioSwitcher';
const {
  RangePicker,
} = DatePicker;

class RSVPTable extends React.Component {

    onChange(date, dateString) {
    console.log(date, dateString);
    }

    render() {
        const {
            allOldEvents,
            requestOldEvents,
            archiveUrl,
        } = this.props;
        return (    
            <div>
                <RangePicker onChange={this.onChange} />

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
                            filename={`${archiveUrl}.csv`}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(RSVPTable);
