import React, { Component } from 'react';
import {
  Col,
  Row,
} from 'reactstrap';
class Resources extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            Resources
            <br /><a href="https://github.com/townhallproject/admin/issues/13" target="_blank">https://github.com/townhallproject/admin/issues/13</a>
            <br /><a href="https://github.com/townhallproject/admin/issues/14" target="_blank">https://github.com/townhallproject/admin/issues/14</a>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Resources;
