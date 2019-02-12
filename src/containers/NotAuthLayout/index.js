import React, { Component } from 'react';

import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Radio,
  Layout,
} from 'antd';
import AppHeader from '../DefaultLayout/Header';

const {
  Header,
  Content,
} = Layout;
const { TextArea } = Input;

const RadioGroup = Radio.Group;

class NotAuthLayout extends Component {
    
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit (e){
        const {
          user,
          submitRequestAccess,
        } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
            submitRequestAccess(user, values)
            }
        });
    }

    render() {
        const {
        user
        } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
             <Layout>
                 <Header>
                    <AppHeader
                        userName={user.username}
                        logOut={this.logOut}
                    />
                </Header>
                <Content>
                    <Row>
                        <Col span={10} offset={8}>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <h2>Request access</h2>
                            <h4>Signed in with {user.email}</h4>
                            <div>You aren't currently an authorized user. Please select the authorization level you want, and we'll get back to you soon. </div>
                            <Form.Item>
                            {getFieldDecorator('accessLevel', {
                                initialValue: '',
                                })(
                                        <RadioGroup 
                                            onChange={this.onChange}
                                        >
                                            <Radio value="rsvpDownloads">Download RSVPs to events</Radio>
                                            <Radio value="eventDownloads">Download Events</Radio>
                                            <Radio value="mocDownload">Access to our Member of Congress database</Radio>
                                            <Radio value="isAdmin">Full Admin</Radio>
                                        </RadioGroup>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('notes', {
                                    initialValue: '',
                                    })(<TextArea placeholder="Notes to us about why you want access" autosize={{ minRows: 2, maxRows: 6 }} />

                                    )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Content>
        </Layout>
        );
    }

}

export default Form.create({})(NotAuthLayout);

