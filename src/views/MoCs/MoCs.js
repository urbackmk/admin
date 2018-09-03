import React, { Component } from 'react';
import {
  Col,
  Row,
} from 'reactstrap';
class MoCs extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            MoCs
            <br /><a href="https://github.com/townhallproject/admin/issues/10" target="_blank">https://github.com/townhallproject/admin/issues/10</a>
            <br /><a href="https://github.com/townhallproject/admin/issues/11" target="_blank">https://github.com/townhallproject/admin/issues/11</a>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MoCs;
