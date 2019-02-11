import React from 'react';
import moment from 'moment';
import {
  connect
} from 'react-redux';
import {
  Divider,
  Table,
  Button,
  Badge,
  Row,
  Tooltip,
} from 'antd';

import userStateBranch from '../../state/users'
import mocStateBranch from '../../state/mocs';

import MocLookUp from '../../components/MocLookup'

import './style.scss';

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
    let color = 
      moc.lastUpdated &&
      moment(moc.lastUpdated).isValid() && 
      moment(moc.lastUpdated).isSameOrAfter(moment().subtract(7, 'days')) ? 'geekblue' : 'red';
    return include && moc.name && (
        <Row
          type="flex"
          justify="space-between"
          align = "middle"
          key={`${moc.id || moc.thpId}-${userId}`}
        >
        <span>
            {moc.district ? <span>{moc.state}-{moc.district}</span> : <span>{moc.state}</span>}
            <Divider type="vertical" />
            <Badge 
              dot
              style={{ backgroundColor: color}} 
            >
              <span>{moc.name}</span>
            </Badge>
          </span>
          {moc.isAssigned ? 
          <Tooltip placement="topRight" title="Remove this moc from this researcher" arrowPointAtCenter>
            <Button
              icon="close" 
              shape="circle"
              onClick={() => 
                this.props.removeAssignmentFromUser(userId, moc.id)}
            /> 
          </Tooltip>

          : 
          <Tooltip placement="topRight" title="Assign this moc to this researcher" arrowPointAtCenter>
            <Button
              icon="plus" 
              shape="circle"
              onClick={() => this.props.assignToUser(userId, moc.id)}
            />
            </Tooltip>
        }

        </Row>
      )        
  }

  selectMoc(userId, mocId, name) {
    this.props.addAndAssignToUser(userId, mocId, name)
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
            icon="plus" 
            type="dashed"
            onClick={() => this.getNames(record.id)}
          >
              Add new
            </Button>
          }
        </span>
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
    // {
    //   title: 'Assign Moc',
    //   key: 'assign-new',
    //   render: (text, record) => (
    //     <span>
    //       {allMocNamesIds.length && editing === record.id ? 
    //       <MocLookUp
    //         allMocNames={allMocNamesIds}
    //         onSelect = {
    //           (mocId, object) => this.selectMoc(record.id, mocId, object.key)
    //         }
    //       />
    //       :
    //       <Button 
    //         icon="plus" 
    //         type="dashed"
    //         onClick={() => this.getNames(record.id)}
    //       >
    //           Add new
    //         </Button>
    //       }
    //     </span>
    //   ),
    // }
    
    ];
    return (
      <div>
        <div className="researcher-table">
        </div>
          <Table 
            columns={columns} 
            dataSource={researchers}
            rowKey={(record) => record.id}
            loading={!researchers.length}
          />
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
