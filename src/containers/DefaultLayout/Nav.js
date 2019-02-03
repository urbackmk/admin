import React, { Component } from 'react';

import {
  Menu,
  Icon
} from 'antd';

import PropTypes from 'prop-types';

import { AppHeaderDropdown, AppNavbarBrand } from '@coreui/react';
import logo from '../../assets/img/brand/logo.png'

const propTypes = {
  children: PropTypes.node,
};

const SubMenu = Menu.SubMenu;

const defaultProps = {};

class NavMenu extends Component {
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
            <SubMenu key="events" title={<span><Icon type="mail" /><span>Events</span></span>}>
              <Menu.Item key="1">Pending</Menu.Item>
              <Menu.Item key="2">Live</Menu.Item>
              <Menu.Item key="3">Archived</Menu.Item>
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
        );
      }
      </React.Fragment>
    );
  }
}

NavMenu.propTypes = propTypes;
NavMenu.defaultProps = defaultProps;

export default NavMenu;
