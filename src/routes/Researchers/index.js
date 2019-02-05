import React, { Component } from 'react';
import {
  Col,
  Row,
} from 'antd';
import ResearcherTable from '../../containers/ResearcherTable';
class Researchers extends Component {
  render() {
    return (
      <React.Fragment>
        <ResearcherTable />
      </React.Fragment>
    );
  }
}

export default Researchers;
