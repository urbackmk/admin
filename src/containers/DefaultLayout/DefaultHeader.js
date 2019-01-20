import React, { Component } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppHeaderDropdown, AppNavbarBrand } from '@coreui/react';
import logo from '../../assets/img/brand/logo.png'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppNavbarBrand
          full={{ src: logo, width: 125, alt: 'Town Hall Project Logo' }}
        />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="/#/dashboard">Home</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="/#/events">Events</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="/#/mocs">MoCs</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="/#/researchers">Researchers</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="/#/resources">Resources</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <span class="mr-5 pr-5">Username</span>
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
