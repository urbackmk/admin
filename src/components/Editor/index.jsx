import React from 'react';
import { Form, Input, Button } from 'antd';
const { TextArea } = Input;

export default ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Send Text Response
      </Button>
        </Form.Item>
    </div>
);