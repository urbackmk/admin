import React from 'react';

import {
    Table,
    Checkbox,
    Input,
    Button,
    Icon,
} from 'antd';

export default class MocTable extends React.Component {

  state = {
    searchText: '',
  }

  updateMissingMember({target}, id) {
    const { updateMissingMemberValue } = this.props;
    updateMissingMemberValue(id, target.checked);
  }

  updateInOffice({target}, id) {
    const { updateInOfficeValue } = this.props;
    updateInOfficeValue(id, target.checked);
  }

  updateDisplayName({target}, id) {
    const { updateDisplayNameValue } = this.props;
    updateDisplayNameValue(id, target.value);
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  
  render() {
    const { mocs } = this.props;
    const columns = [
      {
        title: 'Display Name',
        key: 'displayName',
        render: (mocs, record) => (
          <Input 
            defaultValue={record.displayName}
            onChange={(e) => this.updateDisplayName(e, record.govtrack_id)}
          />
        ),
        ...this.getColumnSearchProps('displayName'),
      },
      {
        title: 'State',
        dataIndex: 'state',
        key: 'state',
        ...this.getColumnSearchProps('state'),
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
              key={record.govtrack_id}
              onChange={(e) => this.updateInOffice(e, record.govtrack_id)} 
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
              onChange={(e) => this.updateMissingMember(e, record.govtrack_id)} 
              defaultChecked={record.missing_member && record.missing_member[116]}>
                  Missing Member
            </Checkbox>
          </span>
        ),
      },
    ];
    return (
      <Table 
        columns={columns}
        dataSource={mocs}
        rowKey={'govtrack_id'}
      />
    )
  }
}
