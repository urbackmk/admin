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
import {
    districts
} from '../../assets/data/districts';
import subscriberStateBranch from '../../state/subscribers';

import './style.scss';

const Option = Select.Option;

const statesOpts = map(statesAb, (stateName, state) => {
    return (<Option key={state}>{state}</Option>)
});

const districtOpts = map(districts, (district) => {
    return (<Option key={district}>{district}</Option>)
});

const stateEvents = map(statesAb, (stateName, state) => {
    return (<Option key={`${state}-state-events`}>{state}-state-events</Option>)
});

const options = [...statesOpts, ...districtOpts, ...stateEvents]

class SubscriberSignup extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        const { getSubscriber } = this.props;
        // getSubscriber('test email');
        console.log(this.props);
        console.log(getSubscriber('test email'));
    }

    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
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
        const nameError = isFieldTouched('districts') && getFieldError('districts');
        return (
        <Form 
            onSubmit={this.handleSubmit}
            className="subscriber-form"
        >
            <Form.Item
            label="Name"
            validateStatus={nameError ? 'error' : ''}
            help={nameError || ''}
            >
            {getFieldDecorator('name')(
                <Input 
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                    type="name" 
                    placeholder="name" />
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
                    <Input 
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    onBlur={this.handleChange}
                    placeholder="email" />
                )}
            </Form.Item>
            <Form.Item
                validateStatus={nameError ? 'error' : ''}
                help={'ex. "AZ" will sign them up for all federal AZ events, "AZ-state-events", only state events'}
                label="districts"
            >
                {getFieldDecorator('districts', {
                    rules: [{ required: true, message: 'Must have districts' }],
                })(
            <Select
                mode="tags"
                style={{ width: '200px' }}
                >
                    {options}
                </Select>
            )}
            </Form.Item>
            <Form.Item>
            <Button
                type="primary"
                htmlType="submit"
                disabled={this.hasErrors(getFieldsError())}
            >
                Submit
            </Button>
            </Form.Item>
        </Form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    submitSubscriber: (person) => dispatch(subscriberStateBranch.actions.submitSubscriber(person)),
});

const mapStateToProps = state => ({
    getSubscriber: (email) => {
        return {
            name: state,
            email: email,
            districts: []
        }
    },
});

const wrappedForm = Form.create({ name: 'SubscriberSignup' })(SubscriberSignup);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedForm);
