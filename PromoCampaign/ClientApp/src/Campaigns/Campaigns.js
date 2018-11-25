import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CampaignsList from './CampaignsList/CampaignsList';
import NewCampaign from './NewCampaign/NewCampaign';

import classes from './Campaigns.module.scss';

const campaigns = (props) => (
            <div className={classes.container}>
                <Switch>
                    <Route exact path={props.match.path} component={CampaignsList}/>
                    <Route exact path={props.match.path + '/new'} component={NewCampaign} />
                    <Redirect to={props.match.path} />
                </Switch>
            </div>
        );

export default campaigns;
