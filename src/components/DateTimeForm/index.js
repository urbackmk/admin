import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Button,
  Checkbox,
  Input,
  DatePicker,
  Form,
  TimePicker,
} from 'antd';

const FormItem = Form.Item;
const timeFormats = ['hh:mm A', 'h:mm A'];

class DateTimeForm extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeStartTime = this.onChangeStartTime.bind(this);
    this.onChangeEndTime = this.onChangeEndTime.bind(this);
    this.closeTimeStart = this.closeTimeStart.bind(this);
    this.closeEndTime = this.closeEndTime.bind(this);
    this.handleOpenStartChange = this.handleOpenStartChange.bind(this);
    this.handleOpenEndChange = this.handleOpenEndChange.bind(this);
    this.onRepeatingEventCheckboxChanged = this.onRepeatingEventCheckboxChanged.bind(this);
    this.state = {
      repeatingEvent: false,
      startOpen: false,
      endTimeOpen: false,
    };
  }

  onRepeatingEventCheckboxChanged(e) {
    this.setState({ repeatingEvent: e.target.checked });
  }

  onChangeDate(date) {
    const {
      updateEvent,
    } = this.props;
    const updateObject = {
          yearMonthDay: moment(date).format('YYYY-MM-DD'),
            dateString: moment(date).format('ddd, MMM D YYYY'),
    }
    updateEvent(updateObject);
  }

  onChangeStartTime(time, timeString) {
    const {
      updateEvent,
    } = this.props;
    const updateObject = {
      timeStart24: moment(timeString, timeFormats).format('HH:mm:ss'),
      Time: moment(timeString, timeFormats).format('h:mm A'),
      timeEnd24: moment(timeString, timeFormats).add(2, 'h').format('HH:mm:ss'),
      timeEnd: moment(timeString, timeFormats).add(2, 'h').format('h:mm A'),
    }
    updateEvent(updateObject);
  }

  onChangeEndTime(time, timeString) {
    const {
      updateEvent,
    } = this.props;
    const updateObject = {

      timeEnd24: moment(timeString, timeFormats).format('HH:mm:ss'),
      timeEnd: moment(timeString, timeFormats).format('h:mm A'),
    }
    updateEvent(updateObject);

  }

  closeTimeStart() {
    this.setState({ startOpen: false });
  }

  closeEndTime() {
    this.setState({ endTimeOpen: false });
  }

  handleOpenStartChange(open) {
    this.setState({ startOpen: open });
  }

  handleOpenEndChange(open) {
    this.setState({ endTimeOpen: open });
  }

  renderRepeatingEvent() {
    const {
      getFieldDecorator,
      currentTownHall,
    } = this.props;
    const { repeatingEvent } = this.state;
    return repeatingEvent ? (
      <FormItem
        className="repeating"
        label="Repeating Event"
      >
        {getFieldDecorator('repeatingEvent', {
          initialValue: '',
        })(
          <Input
            type="text"
            className="input-underline"
            id="repeatingEvent"
            placeholder="Eg. First Tuesday of the month"
          />,
        )}
      </FormItem>
    )
      : (
        <FormItem>
          {
            getFieldDecorator('date', {
              initialValue: moment(currentTownHall.dateString),
              rules: [{
                message: 'Please enter a valid date',
                required: true,
              }],
            })(
              <DatePicker 
                onChange={this.onChangeDate}
                format='L'
              />,
            )}
        </FormItem>
      );
  }

  render() {
    const {
      getFieldDecorator,
      currentTownHall,
    } = this.props;

    const {
      startOpen,
      endTimeOpen,
    } = this.state;
    return (
      <React.Fragment>
        <FormItem className="checkbox">
          <Checkbox
            onChange={this.onRepeatingEventCheckboxChanged}
          >
            Repeating Event
          </Checkbox>
        </FormItem>
        {this.renderRepeatingEvent()}
        <FormItem
          label="Start time"
        >
          {
            getFieldDecorator(
              'time', {
                initialValue: moment(currentTownHall.timeStart24, 'kk:mm:ss'),
                rules: [{
                  message: 'Please enter a valid time',
                  required: true,
                }],
              },
            )(
              <TimePicker
                use12Hours
                minuteStep={15}
                format="h:mm A"
                defaultOpenValue={moment().hour(0).minute(0)}
                onChange={this.onChangeStartTime}
                open={startOpen}
                onOpenChange={this.handleOpenStartChange}
                allowClear={false}
                addon={() => (
                  <Button size="small" type="primary" onClick={this.closeTimeStart}>
                    Ok
                  </Button>
                )}
              />,
            )}
        </FormItem>
        <FormItem
          label="End time"
        >
          {getFieldDecorator(
            'endTime', {
              initialValue: moment(currentTownHall.timeEnd24, 'kk:mm:ss'),
            },
          )(
            <TimePicker
              use12Hours
              minuteStep={15}
              format="h:mm A"
              allowClear={false}
              open={endTimeOpen}
              onOpenChange={this.handleOpenEndChange}
              onChange={this.onChangeEndTime}
              addon={() => (
                <Button size="small" type="primary" onClick={this.closeEndTime}>
                    Ok
                </Button>
              )}
            />,
          )}
        </FormItem>
      </React.Fragment>
    );
  }
}

DateTimeForm.propTypes = {
  getError: PropTypes.func.isRequired,
  getFieldDecorator: PropTypes.func.isRequired,
  requiredFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  setDate: PropTypes.func.isRequired,
  setEndTime: PropTypes.func.isRequired,
  setStartTime: PropTypes.func.isRequired,
};

export default DateTimeForm;
