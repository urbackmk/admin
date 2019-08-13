import {
  Modal,
  Button
} from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

import EditAddressOrDateModal from '../EditAddressOrDateModal';

import './style.scss';

class EditAddressOrDateButton extends React.Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.checkData = this.checkData.bind(this);
    this.state = {
      loading: false,
      visible: false,
      formValues: {},
    };
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  passFormData(data) {
    this.setState({
      formValues: {...this.state.formValues, ...data},
    });
    console.log(this.state.formValues);
  }

  changeAddress(data) {
    const {
      eventId,
    } = this.props;
    this.setState({ loading: true });
    const fullData = {
      ...data,
      eventId,
    };

    if (data.family_name && data.given_name && data.email_address) {
  
    }
  }

  handleClose(e) {
    this.setState({
      visible: false,
    });
  }

  handleCloseOnSubmit(e) {
    this.setState({
      loading: false,
      visible: false,
    });
  }

  checkData() {
    const {
      tempAddress
    } = this.props;
    if (tempAddress.address) {
      console.log('still have address')
      return;
    }
    this.setState({
      loading: false,
      visible: false,
    });
    console.log(this.state.formValues);
  }

  render() {
    const {
      address,
      updateEvent,
      townHall,
      setTempAddress,
      tempAddress,
      clearTempAddress,
    } = this.props;

    return (
      <div>
        <Button 
          className="edit-btn" 
          onClick={this.showModal} 
          icon="edit"
        >
          Edit Address or Date
        </Button>
        <Modal
          title="Edit Address or Date"
          visible={this.state.visible}
          onOk={this.checkData}
          onCancel={this.handleClose}
          closable
        >
          <EditAddressOrDateModal
            loading={this.state.loading}
            currentTownHall={townHall}
            address={address}
            changeAddress={this.changeAddress}
            updateEvent={updateEvent}
            setTempAddress={setTempAddress}
            tempAddress={tempAddress}
            clearTempAddress={clearTempAddress}
            passFormData={this.passFormData}
          />
        </Modal>
      </div>
    );
  }
}

EditAddressOrDateButton.propTypes = {
  eventId: PropTypes.string.isRequired,
  eventAddress: PropTypes.string.isRequired,
};

export default EditAddressOrDateButton;
