import React from 'react';
import moment from 'moment';
import {
  connect
} from 'react-redux';

import {
  Table,
  Button,
  Tag,
} from 'antd';

import userStateBranch from '../../state/users'


class ResearcherTable extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
  };

  componentDidMount() {
      const { 
          getAllResearchers
      } = this.props;
      getAllResearchers();
  }

  handleChange (pagination, filters, sorter) {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }

  clearFilters() {
    this.setState({ filteredInfo: null });
  }

  clearAll() {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  }

  setAgeSort() {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  }

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    const {
        researchers
    } = this.props;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [{
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: 'Assigned Mocs',
      dataIndex: 'mocs',
      key: 'assigned-mocs',
      render: (mocs) => (
          <span>
            {mocs.map((moc, index) => {
                let color = moment(moc.lastUpdated).isSameOrAfter(moment().subtract(7, 'days')) ? 'geekblue' : 'red';
                return (moc.isAssigned && moc.name && <Tag color={color} key={moc.govtrack_id}>{moc.name}</Tag>)
            })}
        </span>)
    },
    {
      title: 'Unassigned Mocs',
      dataIndex: 'mocs',
      key: 'unassigned-mocs',
      render:  (mocs) => (
          <span>
            {mocs.map(moc => {
                let color = moment(moc.lastUpdated).isSameOrAfter(moment().subtract(7, 'days')) ? 'geekblue' : 'red';
                return (!moc.isAssigned && moc.name && <Tag color={color} key={moc.govtrack_id}>{moc.name}</Tag>)
                
            })}
        </span>)
    },
    ];
    return (
      <div>
        <div className="table-operations">

        </div>
        <Table columns={columns} dataSource={researchers} onChange={this.handleChange} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  researchers: userStateBranch.selectors.combineMocNamesWithResearchers(state),
});

const mapDispatchToProps = dispatch => ({
  getAllResearchers: () => dispatch(userStateBranch.actions.requestAllResearchers())
});

export default connect(mapStateToProps, mapDispatchToProps)(ResearcherTable);
