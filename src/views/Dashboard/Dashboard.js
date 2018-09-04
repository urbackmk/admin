import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { Bar, Line } from 'react-chartjs-2';

import {
  // Badge,
  // Button,
  // ButtonDropdown,
  // ButtonGroup,
  // ButtonToolbar,
  Card,
  // CardBody,
  // CardFooter,
  // CardHeader,
  // CardTitle,
  Col,
  // Dropdown,
  // DropdownItem,
  // DropdownMenu,
  // DropdownToggle,
  // Progress,
  Row,
  // Table,
} from 'reactstrap';

import { getEvents } from '../../state/event/actions';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.props.getInitialEvents();

  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              Homepage
              <br /><a href="https://github.com/townhallproject/admin/issues/3" target="_blank" rel="noopener noreferrer">https://github.com/townhallproject/admin/issues/3</a>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  events: state.allEvents,
});

const mapDispatchToProps = dispatch => ({
  getInitialEvents: () => dispatch(getEvents()),
});

// export default Dashboard;
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);