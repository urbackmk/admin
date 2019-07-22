import React from 'react';

import {
    Table,
    Checkbox,
} from 'antd';

export default class MocTable extends React.Component {
    
    render() {
        const { mocs } = this.props;
        const columns = [
            {
                title: 'Display Name',
                dataIndex: 'displayName',
                key: 'displayName',
            },
            {
                title: 'State',
                dataIndex: 'state',
                key: 'state',
            },
            {
                title: 'Chamber',
                dataIndex: 'chamber',
                key: 'chamber',
                filters: [{ text: 'Senate', value: 'upper' }, { text: 'House', value: 'lower' }],
                // filteredValue: filteredInfo.name || null,
                onFilter: (value, record) => record.chamber === value,
            },
            {
                title: 'District',
                dataIndex: 'district',
                key: 'district',
            },
            {
                title: 'Missing member',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Checkbox checked={record.missing_member && !!record.missing_member[116]}>Missing Member</Checkbox>

                    </span>
                ),
            },
        ];
        return (
            <Table columns={columns} dataSource={mocs} />
        )
    }
}
