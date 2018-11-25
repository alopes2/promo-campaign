import React, { Component } from 'react';
import axios from 'axios';

class CampaignsList extends Component {
    state = {
        campaigns: []
    };

    async componentDidMount() {
        try {
            const response = await axios.get('/api/Campaigns');
            this.setState({campaigns: response.data});
        }catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <div>
                Campaigns List
            </div>
        );
    }
}

export default CampaignsList;