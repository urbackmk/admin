import React, { Component } from 'react';


import {
    Icon,
    Menu,
} from 'antd';

import userStateBranch from '../../state/users'


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class AppHeader extends Component {
  constructor() {
      super();
    }

  render() {
      const {
        userName,
        logOut
      } = this.props;
    return (
      <div>
        <Menu
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <SubMenu title={<span className="submenu-title-wrapper">
            <Icon type="user"/>{userName}</span>}>
            <Menu.Item key="logout">Log out</Menu.Item>
        </SubMenu>
      </Menu>
      </div>
    );
  }
}


export default AppHeader;
