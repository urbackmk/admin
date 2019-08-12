import {
  Form,
} from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

import DateTimeForm from '../DateTimeForm';
import LocationForm from '../LocationForm';


class EditAddressOrDateForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);


    this.state = {
      confirmDirty: false,
    };
  }

  handleSubmit(e) {
    const {
      submitRsvp,
    } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        submitRsvp(values);
      }
    });
  }

  handleConfirmBlur(e) {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  render() {
  const {
    address,
    currentTownHall,
    clearTempAddress,
    geoCodeLocation,
    setLatLng,
    setDate,
    setStartTime,
    setEndTime,
    tempAddress,
    tempLat,
    tempLng,
    tempStateName,
    tempState,
  } = this.props;
  const {
    getFieldDecorator,
    getFieldValue,
    setFieldsValue,
  } = this.props.form;

    const formItemLayout = {
      labelCol: {
        sm: { span: 8 },
        xs: { span: 24 },
      },
      wrapperCol: {
        sm: { span: 16 },
        xs: { span: 24 },
      },
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
           <DateTimeForm
              setDate={setDate}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              getFieldDecorator={getFieldDecorator}
              currentTownHall={currentTownHall}
            />
            <LocationForm
              currentTownHall={currentTownHall}
              geoCodeLocation={geoCodeLocation}
              tempAddress={tempAddress}
              address={address}
              clearTempAddress={clearTempAddress}
              tempLat={tempLat}
              tempLng={tempLng}
              tempStateInfo={{
                state: tempState,
                stateName: tempStateName,
              }}
              saveAddress={setLatLng}
              handleInputBlur={this.handleInputBlur}
              getFieldDecorator={getFieldDecorator}
              setFieldsValue={setFieldsValue}
              getFieldValue={getFieldValue}
            />
      </Form>
    );
  }
}

EditAddressOrDateForm.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFieldsAndScroll: PropTypes.func.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  submitRsvp: PropTypes.func.isRequired,
};

const WrappedEditAddressOrDateForm = Form.create({ name: 'address-form' })(EditAddressOrDateForm);

export default WrappedEditAddressOrDateForm;
