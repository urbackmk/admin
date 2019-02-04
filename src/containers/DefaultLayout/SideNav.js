import React, { Component } from 'react';
import { Link } from "react-router-dom";

import {
  Menu,
} from 'antd';

import PropTypes from 'prop-types';

import { PENDING_EVENTS_TAB, LIVE_EVENTS_TAB, ARCHIVED_EVENTS_TAB } from '../../constants';

const propTypes = {
  children: PropTypes.node,
};

const SubMenu = Menu.SubMenu;

const defaultProps = {};

class SideNav extends Component {
    rootSubmenuKeys = ['events', 'mocs', 'researchers', 'resources'];

    state = {
      openKeys: ['events'],
    };

    onOpenChange = (openKeys) => {
      const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.setState({
          openKeys
        });
      } else {
        this.setState({
          openKeys: latestOpenKey ? [latestOpenKey] : [],
        });
      }
    }
  render() {
    const {
      handleChangeTab,
      activeEventTab,
    } = this.props;
    return (
      <React.Fragment>
          <Menu
            mode="inline"
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
            selectedKeys={[activeEventTab]}
            style={{ width: 256 }}
          >
            <Menu.Item key="home">
              <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <SubMenu key="events" title={<Link to="/events"><span>Events</span></Link>}>
              <Menu.Item key={PENDING_EVENTS_TAB} onClick={() => handleChangeTab(PENDING_EVENTS_TAB)}><Link to="/events">Pending</Link></Menu.Item>
              <Menu.Item key={LIVE_EVENTS_TAB} onClick={() => handleChangeTab(LIVE_EVENTS_TAB)}><Link to="/events">Live</Link></Menu.Item>
              <Menu.Item key={ARCHIVED_EVENTS_TAB} onClick={() => handleChangeTab(ARCHIVED_EVENTS_TAB)}><a href="/#/events">Archived</a></Menu.Item>
            </SubMenu>
            <Menu.Item key="mocs">
              <Link to="/mocs">Members of Congress</Link>
            </Menu.Item>
            <Menu.Item key="researchers">
              <Link to="/researchers">Researchers</Link>
            </Menu.Item>
            <Menu.Item key="resources">
              <Link to="/resources">Resources</Link>
            </Menu.Item>
          </Menu>
      </React.Fragment>
    );
  }
}

SideNav.propTypes = propTypes;
SideNav.defaultProps = defaultProps;

export default SideNav;
