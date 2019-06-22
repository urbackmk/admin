import React from 'react';
import {
  Form, Icon, Input, Button, Checkbox, Select,
} from 'antd';
import { map } from 'lodash';

import { statesAb } from '../../assets/data/states';
import './style.scss';

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
      form,
      candidateKeySavePath,
      usState,
    } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const person = {
          ...values,
          level: usState ? 'state' : 'level'
        }
        saveCandidate(candidateKeySavePath, person);
        form.resetFields();
      }
    });
  }

  render() {
    const {
      getFieldDecorator,
      getFieldValue,
    } = this.props.form;
    const {
      usState,
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const noLabelFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit} {...formItemLayout} className="add-person-form" >
        <h1>Add a candidate</h1>

        <Form.Item {...noLabelFormItemLayout}>
          {getFieldDecorator('displayName', {
            rules: [{ required: true, message: 'need a name' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Display Name" />
          )}
        </Form.Item>
        <Form.Item label="Level (state or federal)">
          {getFieldDecorator('level', {
            initialValue: usState ? 'state' : 'federal',
            rules: [{ required: true}],
          })(
            <Select>
                <Option value="federal">federal</Option>
                <Option value="state">state</Option>
            </Select>
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
                <Option value="nationwide">Pres</Option>
            </Select>
          )}
        </Form.Item>
        {(getFieldValue('chamber') === 'lower' || usState) && 
        <Form.Item 
          {...noLabelFormItemLayout}
          hasFeedback 
          help={usState ? "full district, ie HD-9" : "zero padded number, '09'"}
        >
          {getFieldDecorator('district', {
            rules: [{ required: false, message: 'need a name' }],
          })(
            <Input placeholder="District" />
          )}
        </Form.Item>}
        <Form.Item label="Incumbent">
          {getFieldDecorator('incumbent')(
            <Checkbox />
          )}
        </Form.Item>
        <Form.Item label="Pledger">
          {getFieldDecorator('pledged')(
            <Checkbox />
          )}
        </Form.Item>
        <Form.Item label="State">
          {getFieldDecorator('state', {
            initialValue: usState || ''
          })(
            <Select
              placeholder="Select a State"
            >
                {children}
            </Select>
          )}
        </Form.Item>
        <Form.Item  {...noLabelFormItemLayout}>
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
