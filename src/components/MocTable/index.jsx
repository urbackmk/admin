import React from 'react';

import {
    Table,
    Checkbox,
} from 'antd';

export default class MocTable extends React.Component {
  handleChange({target}, id) {
    const { updateMissingMemberValue } = this.props;
    updateMissingMemberValue(id, target.checked)
  }

  updateInOffice({target}, id) {

  }
  
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
          onFilter: (value, record) => record.chamber === value,
        },
        {
          title: 'District',
          dataIndex: 'district',
          key: 'district',
        },
        {
          title: 'In Office',
          key: 'in_office',
          render: (mocs, record) => (
            <span>
              <Checkbox 
                key={record.in_office}
                onChange={(e) => this.updateInOffice(e, record.in_office)} 
                defaultChecked={record.in_office}>
                  In Office
              </Checkbox>
            </span>
          ),
        },
        {
          title: 'Missing member',
          key: 'action',
          render: (mocs, record) => (
            <span>
              <Checkbox 
                key={record.govtrack_id}
                onChange={(e) => this.handleChange(e, record.govtrack_id)} 
                defaultChecked={record.missing_member && record.missing_member[116]}>
                    Missing Member
              </Checkbox>
            </span>
          ),
        },
    ];
    return (
      <Table columns={columns} dataSource={mocs} />
    )
  }
}
