import React from 'react';
import {
  Form, Icon, Input, Button, Checkbox, Select,
} from 'antd';
import { map } from 'lodash';

import { statesAb } from '../../assets/data/states';

const { Option } = Select;

const children = map(statesAb, (value, key) => (<Option key={key}>{value}</Option>));


class AddPersonForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRoleSelectChange = this.handleRoleSelectChange.bind(this);
  }

  handleRoleSelectChange(value) {
    const mapping = {
      Rep: 'lower',
      Sen: 'upper',
      Gov: 'statewide',
      Mayor: 'citywide',
      Pres: 'nationwide',
    }
    this.props.form.setFieldsValue({
      chamber: mapping[value],
    });
  }

  handleSubmit(e) {
    const {
      saveCandidate,
      form
    } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        saveCandidate(values);
        form.resetFields();
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="add-person-form" >
        <Form.Item>
          {getFieldDecorator('displayName', {
            rules: [{ required: true, message: 'need a name' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Display Name" />
          )}
        </Form.Item>
        
        <Form.Item label="Party">
          {getFieldDecorator('party', {
            rules: [{ required: true, message: 'enter a party' }],
          })(
            <Select>
                <Option value="R">Republican</Option>
                <Option value="D">Democratic</Option>
                <Option value="I">Independent</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Running For">
          {getFieldDecorator('role', {
            rules: [{ required: true, message: 'Please enter a role' }],
          })(
            <Select
              onChange={this.handleRoleSelectChange}
            >
                <Option value="Rep">Rep</Option>
                <Option value="Sen">Senator</Option>
                <Option value="Gov">Gov</Option>
                <Option value="Mayor">Mayor</Option>
                <Option value="Pres">Pres</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Chamber">
          {getFieldDecorator('chamber', {
            rules: [{ required: true, message: 'Party' }],
          })(
            <Select>
                <Option value="upper">upper</Option>
                <Option value="lower">lower</Option>
                <Option value="statewide">Gov</Option>
                <Option value="citywide">Mayor</Option>
                <Option value="statewide">Pres</Option>
            </Select>
          )}
        </Form.Item>
     
        <Form.Item label="Incumbent">
          {getFieldDecorator('incumbent')(
            <Checkbox />
          )}
        </Form.Item>
        <Form.Item label="State">
          {getFieldDecorator('state', {
          })(
            <Select 
              placeholder="Select a State"
            >
                {children}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Save to database
          </Button>
        </Form.Item>
      </Form>
    );
  }
}


export default Form.create({
  name: 'add_person_form'
})(AddPersonForm);
