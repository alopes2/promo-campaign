import React from 'react';
import { Grid, Row, Col} from 'react-bootstrap';
import Header from './Header/Header';

const layout = (props) => (
    
    <Grid fluid>
    <Row>
      <Col sm={3}>
        <Header />
      </Col>
      <Col sm={9}>
        {props.children}
      </Col>
    </Row>
  </Grid>
);

export default layout;