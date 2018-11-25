import React, { Component } from 'react';
import axios from 'axios';
import './CampaignsList.scss';
class CampaignsList extends Component {
    state = {
        campaigns: [],
        filter: {
            isActive: null,
            start: null,
            end: null,
            productId: null,
            sortBy: null,
            ascending: true,
            page: 1,
            pageSize: 3
        },
        columns: [
            { title: 'Name', key: 'name', isSortable: true},
            { title: 'Product', key: 'productName', isSortable: true},
            { title: 'Start', key: 'start', isSortable: true},
            { title: 'End', key: 'end', isSortable: true}
        ]
    };
    
    async fetchCampaigns() {
        try {
            const response = await axios.get('/api/Campaigns');
            console.log(response);
            this.setState({campaigns: response.data});
        }catch (e) {
            console.error(e);
        }
    }

    componentDidMount() {
        this.fetchCampaigns();
    }

    handleSortBy = (column) => {

    }

    render() {
        let list = (
            <tr>
                <td colSpan="4">No campaigns available :(</td>
            </tr>
        );

        if (this.state.campaigns.length > 0) {
            list = this.state.campaigns
                     .map(c => (
                         <tr key={c.id}>
                             <td>{c.name}</td>
                             <td>{c.product.name}</td>
                             <td>{c.start}</td>
                             <td>{c.end}</td>
                         </tr>
                     ));
        }
        console.log(this.state);

        let columnHeaders = this.state.columns
            .map(col => {
                let arrow = null;
                console.log(col.key);
                if (this.state.filter.sortBy === col.key) {
                    let orderClasses = this.state.filter.ascending
                        ? ["fa", "fa-sort-asc"]
                        : ["fa", "fa-sort-desc"];

                    arrow = (<i
                        className={orderClasses.join(' ')}></i>);
                }
                return (<th key={col.key}> 
                    <div onClick={() => this.handleSortBy(col.key)}>
                        {col.title}
                        {arrow}
                    </div>
                </th>);
            });
        return (
            <table className="table">
                <thead>
                    <tr>
                        {columnHeaders}
                    </tr>
                </thead>
                <tbody>
                    {list}
                </tbody>
            </table>
        );
    }
}

export default CampaignsList;