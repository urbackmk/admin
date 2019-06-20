import React from 'react';
import {
    connect
} from 'react-redux';
import {
    map
} from 'lodash';
import {
    Form, Icon, Input, Button, Select, AutoComplete
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

    state = {
        emailDataSource: [],
        submitText: 'Add New',
    }

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.emailSearch = this.emailSearch.bind(this);
        this.emailSelect = this.emailSelect.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }

    componentDidMount() {
        const { getAllSubscribers } = this.props;
        getAllSubscribers();
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
              submitSubscriber(values);
            }
        });
        this.clearForm();
    }

    emailSearch(input) {
        this.setState({
            emailDataSource: this.props.allSubscribers.reduce((acc, curr) => {
                if (curr.email.includes(input)) acc.push(curr.email);
                return acc;
            }, [])
        });
    }

    emailSelect(input) {
        const editSubscriber = this.props.allSubscribers.find((sub) => {
            return sub.email === input;
        });
        this.props.form.setFieldsValue({
            name: editSubscriber.name,
            districts: editSubscriber.districts,
            key: editSubscriber.key,
        });
        this.setState({ submitText: 'Update' });
    }

    clearForm() {
        this.props.form.resetFields();
        this.setState({ submitText: 'Add New' });
    }

    render() {
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;
        const {
            emailDataSource, submitText,
        } = this.state;
      
        // Only show error after a field is touched.
        const emailError = isFieldTouched('email') && getFieldError('email');
        const nameError = isFieldTouched('districts') && getFieldError('districts');

        return (
        <Form 
            onSubmit={this.handleSubmit}
            className="subscriber-form"
        >
            <Form.Item
                label="Email"
                validateStatus={emailError ? 'error' : ''}
                help={emailError || ''}
            >
                {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Must have an email' }],
                })(<AutoComplete 
                        dataSource={emailDataSource}
                        onSearch={this.emailSearch}
                        onSelect={this.emailSelect}
                        placeholder="email" />
                )}
            </Form.Item>
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
                {getFieldDecorator('key')(
                    <Input type="hidden" />
                )}
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={this.hasErrors(getFieldsError())}
                >
                    {submitText}
                </Button>
                <Button
                    type="default"
                    htmlType="reset"
                    onClick={this.clearForm}
                >
                    Clear Form
                </Button>
            </Form.Item>
        </Form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    submitSubscriber: (person) => dispatch(subscriberStateBranch.actions.submitSubscriber(person)),
    getAllSubscribers: () => dispatch(subscriberStateBranch.actions.getAllSubscribers()),
});

const mapStateToProps = state => ({
    allSubscribers: subscriberStateBranch.selectors.allSubscribers(state),
});

const wrappedForm = Form.create({ name: 'SubscriberSignup' })(SubscriberSignup);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedForm);
