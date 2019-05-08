import React from 'react';
import {
    connect
} from 'react-redux';
import {
    map
} from 'lodash';
import {
    Form, Icon, Input, Button, Select,
  } from 'antd';
import {
    statesAb
} from '../../assets/data/states';
import userStateBranch from '../../state/users';

const Option = Select.Option;

const children = map(statesAb, (stateName, state) => {
    return (<Option key={state}>{state}</Option>)
});

class SubscriberSignup extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    handleSubmit(e) {
        e.preventDefault();
        const {
            submitSubscriber,
        } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
              submitSubscriber(values);
            }
          });
    }

    render() {
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;
      
        // Only show error after a field is touched.
        const emailError = isFieldTouched('email') && getFieldError('email');
        const nameError = isFieldTouched('name') && getFieldError('name');
        return (
        <Form layout="inline" onSubmit={this.handleSubmit}>
            <Form.Item
            label="Name"
            validateStatus={nameError ? 'error' : ''}
            help={nameError || ''}
            >
            {getFieldDecorator('name')(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="name" placeholder="name" />
            )}
            </Form.Item>
            <Form.Item
            label="Email"
            validateStatus={emailError ? 'error' : ''}
            help={emailError || ''}
            >
            {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Must have an email' }],
            })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="email" />
            )}
            </Form.Item>
            <Form.Item
            validateStatus={nameError ? 'error' : ''}
            help={nameError || ''}
            >
            {getFieldDecorator('districts')(
            <Select
                mode="tags"
                style={{ width: '200px' }}
                onChange={this.handleChange}
                >
                {children}
                </Select>
            )}
            </Form.Item>
            <Form.Item>
            <Button
                type="primary"
                htmlType="submit"
                //disabled={hasErrors(getFieldsError())}
            >
                Submit
            </Button>
            </Form.Item>
        </Form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    submitSubscriber: (person) => dispatch(userStateBranch.actions.submitSubscriber(person)),
});

const wrappedForm = Form.create({ name: 'SubscriberSignup' })(SubscriberSignup);
export default connect(null, mapDispatchToProps)(wrappedForm);
