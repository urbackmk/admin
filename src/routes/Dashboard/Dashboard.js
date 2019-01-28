import React, { Component } from 'react';
import {
  Card,
  Col,
  Row,
} from 'reactstrap';
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
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

export default Dashboard;
