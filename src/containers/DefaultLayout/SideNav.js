import React, { Component } from 'react';

import {
  Menu,
  Icon
} from 'antd';

import PropTypes from 'prop-types';

import { AppNavbarBrand } from '@coreui/react';
import logo from '../../assets/img/brand/logo.png'
import { PENDING_EVENTS_TAB, LIVE_EVENTS_TAB, ARCHIVED_EVENTS_TAB } from '../../constants';

const propTypes = {
  children: PropTypes.node,
};

const SubMenu = Menu.SubMenu;

const defaultProps = {};

class SideNav extends Component {
    rootSubmenuKeys = ['events', 'mocs', 'researchers', 'resources'];

    state = {
      openKeys: [],
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
      handleChangeTab
    } = this.props;
    return (
      <React.Fragment>
        <AppNavbarBrand
          full={{ src: logo, width: 125, alt: 'Town Hall Project Logo' }}
        />
          <Menu
            mode="inline"
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
            style={{ width: 256 }}
          >
            <SubMenu key="events" title={<a href="/#/events"><span><Icon type="mail" />Events</span></a>}>
              <Menu.Item key="1" onClick={() => handleChangeTab(PENDING_EVENTS_TAB)}><a href="/#/events">Pending</a></Menu.Item>
              <Menu.Item key="2" onClick={() => handleChangeTab(LIVE_EVENTS_TAB)}><a href="/#/events">Live</a></Menu.Item>
              <Menu.Item key="3" onClick={() => handleChangeTab(ARCHIVED_EVENTS_TAB)}><a href="/#/events">Archived</a></Menu.Item>
            </SubMenu>
            
            <Menu.Item key="mocs">
              <a href="/#/mocs" >Members of Congress</a>
            </Menu.Item>
            <Menu.Item key="researchers">
              <a href="/#/researchers">Researchers</a>
            </Menu.Item>
            <Menu.Item key="resources">
                <a href="/#/resources">Resources</a>
            </Menu.Item>
          </Menu>
      </React.Fragment>
    );
  }
}

SideNav.propTypes = propTypes;
SideNav.defaultProps = defaultProps;

export default SideNav;
