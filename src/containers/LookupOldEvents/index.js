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
} from 'react-csv';
import moment from 'moment';
import selectionStateBranch from '../../state/selections';
import eventStateBranch from '../../state/events';
import { getDateArray } from '../../utils';

const {
  RangePicker,
} = DatePicker;

class LookupOldEvents extends React.Component {

    constructor(props) {
        super(props);
        this.onDateRangeChange = this.onDateRangeChange.bind(this);
        this.handleRequestOldEvents = this.handleRequestOldEvents.bind(this);
    }

    onDateRangeChange(date, dateString) {
        const {
            changeDataLookupRange
        } = this.props;
        changeDataLookupRange(dateString);
    }

    handleRequestOldEvents(){
        const {
            requestOldEvents,
            archiveUrl,
            dateLookupRange,
        } = this.props;
        const dateStart = moment(dateLookupRange[0]).startOf('day').valueOf();
        const dateEnd = moment(dateLookupRange[1]).endOf('day').valueOf();

        const dateArray = getDateArray(dateLookupRange);
        dateArray.forEach(date => {
            requestOldEvents(archiveUrl, date, [dateStart, dateEnd])
        })
    }

    render() {
        const {
            allOldEvents,
            archiveUrl,
            loading,
        } = this.props;
        return (    
            <div>
                <RangePicker 
                    onChange={this.onDateRangeChange} 
                    format = "MMM D, YYYY"
                />

                <Button
                    onClick={this.handleRequestOldEvents}
                >Request events</Button>
                {allOldEvents.length && !loading &&
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
    dateLookupRange: selectionStateBranch.selectors.getDateRange(state),
    loading: eventStateBranch.selectors.getLoading(state),
});

const mapDispatchToProps = dispatch => ({
    requestOldEvents: (path, date, dates) => dispatch(eventStateBranch.actions.requestOldEvents(path, date, dates)),
    changeDataLookupRange: (dates) => dispatch(selectionStateBranch.actions.changeDateLookup(dates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LookupOldEvents);
