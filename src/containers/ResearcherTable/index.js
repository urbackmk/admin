import React from 'react';
import moment from 'moment';
import {
  connect
} from 'react-redux';

import {
  Table,
  Icon,
  Divider,
  Button,
  Badge,
  Tag,
  Row,
} from 'antd';

import userStateBranch from '../../state/users'


class ResearcherTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredInfo: null,
      sortedInfo: null,
    };
  }

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

  // clearFilters() {
  //   this.setState({ filteredInfo: null });
  // }

  // clearAll() {
  //   this.setState({
  //     filteredInfo: null,
  //     sortedInfo: null,
  //   });
  // }

  // setAgeSort() {
  //   this.setState({
  //     sortedInfo: {
  //       order: 'descend',
  //       columnKey: 'age',
  //     },
  //   });
  // }

  removeMocFromUser(userId, mocId) {
    console.log(userId, mocId)
    this.props.removeAssignmentFromUser(userId, mocId)
  }
  renderMocName(moc, include, userId){
    let color = moment(moc.lastUpdated).isSameOrAfter(moment().subtract(7, 'days')) ? 'geekblue' : 'red';

    return include && moc.name && (
        <Row
          type="flex"
          justify="space-between"
          align = "middle"
        >
          <Badge 
            dot
            color={color}
          >
            <span>{moc.name}</span>
          </Badge>
          {moc.isAssigned && 
          <Button 
            icon="close" 
            onClick={() => this.removeMocFromUser(userId, moc.govtrack_id)}
          />}

        </Row>
      )
                
            
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
      render: (mocs, record, index) => {
         return( <span>
            {mocs.map((moc) => this.renderMocName(moc, moc.isAssigned, record.id))}
        </span>)}
    },
    {
      title: 'Unassigned Mocs',
      dataIndex: 'mocs',
      key: 'unassigned-mocs',
      render:  (mocs) => (
          <span>
            {mocs.map((moc) => this.renderMocName(moc, !moc.isAssigned))}
        </span>)
    },
    ];
    return (
      <div>
        <div className="table-operations">
        </div>
        <Table columns={columns} dataSource={researchers}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  researchers: userStateBranch.selectors.combineMocNamesWithResearchers(state),
});

const mapDispatchToProps = dispatch => ({
  getAllResearchers: () => dispatch(userStateBranch.actions.requestAllResearchers()),
  removeAssignmentFromUser: (userId, mocId) => dispatch(userStateBranch.actions.removeAssignment(userId, mocId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ResearcherTable);
