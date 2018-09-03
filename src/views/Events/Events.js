import React, { Component } from 'react';
import {
  Col,
  Row,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap';
import classnames from 'classnames';

class Events extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 'Pending',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" className="mb-4">
            <Card>
              <CardHeader>
                <CardTitle>Events</CardTitle>
              </CardHeader>
              <CardBody>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === 'Pending' })}
                      onClick={() => { this.toggle('Pending'); }}
                    >
                      Pending
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === 'Active' })}
                      onClick={() => { this.toggle('Active'); }}
                    >
                      Active
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === 'Archived' })}
                      onClick={() => { this.toggle('Archived'); }}
                    >
                      Archived
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="Pending">
                    Card based view of all events that need approval.  The complete event data is shown, and can be edited and approved/rejected/archived.  Very similar to the existing approval workflow in the current admin site. 
                    <br /><a href="https://github.com/townhallproject/admin/issues/5" target="_blank">https://github.com/townhallproject/admin/issues/5</a>
                  </TabPane>
                  <TabPane tabId="Active">
                    Tabular view of all current active events.

                    Clicking on an individual event will bring you to the event detail modal (this is a master-detail view).
                      
                    Filters include: Date ranges, member name, event type, map icon, party, etc

                    <br /><a href="https://github.com/townhallproject/admin/issues/6" target="_blank">https://github.com/townhallproject/admin/issues/6</a>
                  </TabPane>
                  <TabPane tabId="Archived">
                    This page starts off with no results.  Once the admin searches it's populated with a card view of all matching archived events.

                    We may wish to allow inline editing of events, since in practice we'll only have one event at a time.
                      
                    Filters include: Date ranges, member name, event type, map icon, party, etc

                    <br /><a href="https://github.com/townhallproject/admin/issues/7" target="_blank">https://github.com/townhallproject/admin/issues/7</a>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>

          {/* <Col>
            <Card>
              <CardHeader>
                Events
              </CardHeader>
              <CardBody>
                <Row>
                  Events
                </Row>
              </CardBody>
            </Card>
          </Col> */}
        </Row>
      </div>
    );
  }
}

export default Events;
