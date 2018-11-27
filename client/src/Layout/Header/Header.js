import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Header.scss';

const header = () => (
    <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/campaigns'}>PromoCampaign</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={'/campaigns'} exact>
              <NavItem>
                <Glyphicon glyph='home' /> Campaign List
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/campaigns/new'}>
              <NavItem>
                <Glyphicon glyph='education' /> Add New Campaign
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
);

export default header;