import React from 'react';
import {
  connect
} from 'react-redux';
import { map } from 'lodash';
import {
  Button,
  Switch,
  DatePicker,
  Select,
  Row,
} from 'antd';
import {
    VictoryBar,
    VictoryChart,
    VictoryTheme
} from 'victory';
import {
  CSVLink,
} from 'react-csv';
import moment from 'moment';
import selectionStateBranch from '../../state/selections';
import eventStateBranch from '../../state/events';
import { getDateArray } from '../../utils';
import { statesAb } from '../../assets/data/states';

import "./style.scss";

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
        this.onIncludeLiveEvents = this.onIncludeLiveEvents.bind(this);
    }

    onDateRangeChange(date, dateString) {
        const {
            changeDataLookupRange
        } = this.props;
        changeDataLookupRange(dateString);
    }

    onIncludeLiveEvents(checked) {
        const {
            requestLiveEvents
        } = this.props;
        if(checked) {
            requestLiveEvents('townHalls/')
        }

    }

    handleAddState(value) {
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
            dataForChart,
        } = this.props;
        return (    
            <div
                className="lookup-form"
            >
                <Row
                    type="flex" 
                >
                    <RangePicker 
                        onChange={this.onDateRangeChange} 
                        format = "MMM D, YYYY"
                    />
                </Row>
                <Row
                    type="flex" 
                >
                    <Select
                        mode="tags"
                        placeholder="Select a state to filter"
                        onChange={this.handleAddState}
                        style={{ width: '100%' }}
                    >
                        {children}
                    </Select>
                </Row>
                <Row
                    type="flex" 
                >
                    <label>Include live events</label>
                    <Switch onChange={this.onIncludeLiveEvents} />
                </Row>
                <Row
                    type="flex" 
                >
                    <Button
                        onClick={this.handleRequestOldEvents}
                        loading={loading}
                        type="primary"
                    >Request events</Button>
                
                    {filteredOldEvents.length && !loading &&
                    <React.Fragment>
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
                          <VictoryChart
                            domainPadding={{ x: 20 }}

                          >
                            <VictoryBar
                                horizontal
                                barWidth={40}

                                data={dataForChart}
                                x="party"
                                width={200}
                                y="value"
                                 style={{
                                data: {
                                    fill: (d) => d.party === 'R' ? "#ff4741" : "#3facef",
                                    stroke: (d) => d.party === 'R' ? "#ff4741" : "#3facef",
                                    fillOpacity: 0.7,
                                    strokeWidth: 3
                                    }}
                                }
                            />
                        </VictoryChart>
                    </React.Fragment>
                }
                </Row>
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
    dataForChart: selectionStateBranch.selectors.getDataForArchiveChart(state),
});

const mapDispatchToProps = dispatch => ({
    requestOldEvents: (path, date, dates) => dispatch(eventStateBranch.actions.requestOldEvents(path, date, dates)),
    changeDataLookupRange: (dates) => dispatch(selectionStateBranch.actions.changeDateLookup(dates)),
    handleChangeStateFilters: (states) => dispatch(selectionStateBranch.actions.changeStateFilters(states)),
    requestLiveEvents: (path) => dispatch(eventStateBranch.actions.requestEvents(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LookupOldEvents);
