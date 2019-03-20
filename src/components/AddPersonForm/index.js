import React from 'react';

import {
  Form, Icon, Input, Button, Checkbox, Select,
} from 'antd';

const { Option } = Select;

class AddPersonForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="add-person-form">
        <Form.Item>
          {getFieldDecorator('displayName', {
            rules: [{ required: true, message: 'need a name' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Display Name" />
          )}
        </Form.Item>
        
        <Form.Item>
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
        <Form.Item>
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
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}


export default Form.create({
  name: 'add_person_form'
})(AddPersonForm);
