import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './Layout/Layout';
import Campaigns from './Campaigns/Campaigns';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/campaigns" component={Campaigns} />
          <Redirect to="/campaigns" />
        </Switch>
      </Layout>
    );
  }
}

export default App;
