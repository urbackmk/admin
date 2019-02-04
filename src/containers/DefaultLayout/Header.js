import React, { Component } from 'react';
import {
    Col,
    Icon,
    Menu,
    Row,
} from 'antd';

import logo from '../../assets/img/brand/logo.png'

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
      <Row
        justify="space-between"
        type="flex"
      >
      <Col span={4}>
        <img
            width={120}
            src={logo}
        />
        </Col>
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
      </Row>
    );
  }
}


export default AppHeader;
