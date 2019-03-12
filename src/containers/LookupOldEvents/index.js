import React from 'react';
import {
  connect
} from 'react-redux';
import { map } from 'lodash';
import {
  Button,
  DatePicker,
  Select,
  Spin, 
  Icon,
} from 'antd';
import {
  CSVLink,
} from 'react-csv';
import moment from 'moment';
import selectionStateBranch from '../../state/selections';
import eventStateBranch from '../../state/events';
import { getDateArray } from '../../utils';
import { statesAb } from '../../assets/data/states';

const {
  RangePicker,
} = DatePicker;
const Option = Select.Option;

const children = map(statesAb, (value, key) => (<Option key={key}>{value}</Option>));

class LookupOldEvents extends React.Component {

    constructor(props) {
        super(props);
        this.onDateRangeChange = this.onDateRangeChange.bind(this);
        this.handleRequestOldEvents = this.handleRequestOldEvents.bind(this);
        this.handleAddState = this.handleAddState.bind(this);
    }

    onDateRangeChange(date, dateString) {
        const {
            changeDataLookupRange
        } = this.props;
        changeDataLookupRange(dateString);
    }

    handleAddState(value) {
        console.log(value)
        const {
          handleChangeStateFilters
        } = this.props;
        handleChangeStateFilters(value)
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
            filteredOldEvents,
            archiveUrl,
            loading,
        } = this.props;
        return (    
            <div>
                <RangePicker 
                    onChange={this.onDateRangeChange} 
                    format = "MMM D, YYYY"
                />
                <Select
                    mode="tags"
                    placeholder="Select a state to filter"
                    onChange={this.handleAddState}
                    style={{ width: '100%' }}
                >
                    {children}
                </Select>

                <Button
                    onClick={this.handleRequestOldEvents}
                >Request events</Button>
                {loading && (<Icon type="loading" style={{ fontSize: 24 }} spin />)}
                {filteredOldEvents.length && !loading &&
                    <Button 
                        icon="download"
                    >
                        <CSVLink 
                            data = {
                            filteredOldEvents
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
    filteredOldEvents: selectionStateBranch.selectors.getFilteredArchivedEvents(state),
    dateLookupRange: selectionStateBranch.selectors.getDateRange(state),
    loading: eventStateBranch.selectors.getLoading(state),
});

const mapDispatchToProps = dispatch => ({
    requestOldEvents: (path, date, dates) => dispatch(eventStateBranch.actions.requestOldEvents(path, date, dates)),
    changeDataLookupRange: (dates) => dispatch(selectionStateBranch.actions.changeDateLookup(dates)),
    handleChangeStateFilters: (states) => dispatch(selectionStateBranch.actions.changeStateFilters(states)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LookupOldEvents);
