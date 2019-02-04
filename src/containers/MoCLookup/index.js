import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';

import mocStateBranch from '../../state/mocs';

import { AutoComplete, Form } from 'antd';

  class MoCLookUp extends React.Component {
        componentDidMount() {
            const {
                requestMocIds,
            } = this.props;
            console.log('requesting form component')
            requestMocIds()
        }

        render() {
            const {
                allMocNames
            } = this.props;
            return (
                <Form>
                    <Form.Item>
                    <AutoComplete
                        dataSource={allMocNames}
                        style={{ width: 200 }}
                        // onSelect={onSelect}
                        onSearch={this.handleSearch}
                        placeholder="lookup moc"
                    />
                </Form.Item>
                </Form>
            );
    }
}

const mapStateToProps = state => ({
  allMocNames: mocStateBranch.selectors.getAllMocNames(state),
});

const mapDispatchToProps = dispatch => ({
  requestMocIds: () => dispatch(mocStateBranch.actions.requestMocIds()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoCLookUp);
