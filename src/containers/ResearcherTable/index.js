import React from 'react';
import moment from 'moment';
import {
  connect
} from 'react-redux';
import {
  Table,
  Button,
  Badge,
  Row,
  Tooltip,
} from 'antd';

import userStateBranch from '../../state/users'
import mocStateBranch from '../../state/mocs';

import MocLookUp from '../../components/MocLookup'

class ResearcherTable extends React.Component {
  constructor(props) {
    super(props);
    this.getNames = this.getNames.bind(this);
    this.selectMoc = this.selectMoc.bind(this);
    this.state = {
      filteredInfo: null,
      sortedInfo: null,
      editing: null,
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
         
          {moc.isAssigned ? 
          <Tooltip placement="topRight" title="Remove this moc from this researcher" arrowPointAtCenter>
            <Button
              icon="close" 
              shape="circle"
              onClick={() => 
                this.props.removeAssignmentFromUser(userId, moc.govtrack_id)}
            /> 
          </Tooltip>

          : 
          <Tooltip placement="topRight" title="Assign this moc to this researcher" arrowPointAtCenter>
            <Button
              icon="plus" 
              shape="circle"
              onClick={() => this.props.assignToUser(userId, moc.govtrack_id)}
            />
            </Tooltip>
        }

        </Row>
      )        
  }

  selectMoc(userId, mocId, name) {
    console.log(userId, mocId, name)
    this.props.addAndAssignToUser(userId, name)
  }

  getNames(id) {
      const {
        requestMocIds,
      } = this.props;
      requestMocIds();
      this.setState({editing: id})
  }

  render() {
    let {
      editing,
    } = this.state;
    const {
        researchers,
        allMocNamesIds,
    } = this.props;
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
      render: (mocs, record) => {
         return( <span>
            {mocs.map((moc) => this.renderMocName(moc, moc.isAssigned, record.id))}
        </span>)}
    },
    {
      title: 'Unassigned Mocs',
      dataIndex: 'mocs',
      key: 'unassigned-mocs',
      render: (mocs, record) => (
          <span>
            {mocs.map((moc) => this.renderMocName(moc, !moc.isAssigned, record.id))}
        </span>)
    },
    {
      title: 'Assign Moc',
      key: 'assign-new',
      render: (text, record) => (
        <span>
          {allMocNamesIds.length && editing === record.id ? 
          <MocLookUp
            allMocNames={allMocNamesIds}
            onSelect = {
              (mocId, object) => this.selectMoc(record.id, mocId, object.key)
            }
          />
          :
          <Button 
            icon="add"
            onClick={() => this.getNames(record.id)}
          >
            Look up moc and assign
            </Button>
          }
        </span>
      ),
    }
    
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
  allMocNamesIds: mocStateBranch.selectors.getAllMocsIds(state),
});

const mapDispatchToProps = dispatch => ({
  getAllResearchers: () => dispatch(userStateBranch.actions.requestAllResearchers()),
  removeAssignmentFromUser: (userId, mocId) => dispatch(userStateBranch.actions.removeAssignment(userId, mocId)),
  addAndAssignToUser: (userId, mocId, name) => dispatch(userStateBranch.actions.addAndAssignToUser(userId, mocId, name)),
  assignToUser: (userId, mocId) => dispatch(userStateBranch.actions.assignMocToUser(userId, mocId)),
  requestMocIds: () => dispatch(mocStateBranch.actions.requestMocIds()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResearcherTable);
