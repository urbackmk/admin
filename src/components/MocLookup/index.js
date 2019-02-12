import React from 'react';
import {
  map,
  uniqBy,
} from 'lodash';
import { AutoComplete, Form } from 'antd';
const Option = AutoComplete.Option;

export default class MoCLookUp extends React.Component {

        render() {
            const {
                allMocNames,
                onSelect,
            } = this.props;
            const children = map(uniqBy(allMocNames, 'nameEntered') , moc => (<Option key={moc.nameEntered} value={moc.id.toString()}>{moc.nameEntered}</Option>))
            return (<Form>
                    <Form.Item>
                        <AutoComplete
                            style={{ width: 200 }}
                            onSelect={onSelect}
                            placeholder="type lawmaker name then select"
                            filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        >
                        {children}
                        </AutoComplete>
                    </Form.Item>
                </Form>
            );
    }

}