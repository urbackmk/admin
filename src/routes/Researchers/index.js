import React, { Component } from 'react';
import {
  Col,
  Row,
} from 'reactstrap';
class Researchers extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            Researchers
            <br /><a href="https://github.com/townhallproject/admin/issues/12" target="_blank" rel="noopener noreferrer" >https://github.com/townhallproject/admin/issues/12</a>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Researchers;
