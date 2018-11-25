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

    handleFilterChange = (event) => {
        const updatedFilter = {
            ...this.state.filter,
            isActive: event.target.value
        };
        console.log(updatedFilter);
        this.setState({filter: updatedFilter})
    }

    handleSortBy = (column) => {

    }

    formatDate(stringDate) {
        const date = new Date(stringDate);
        return `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;
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
                             <td>{this.formatDate(c.start)}</td>
                             <td>{this.formatDate(c.end)}</td>
                         </tr>
                     ));
        }

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
            <div>
                <h1>Campaigns List</h1>
                <div className="well">
                        <div className="form-group">
                            <label for="active">Active status</label>
                            <select name="active" id="active" className="form-control" onChange={this.handleFilterChange}>
                                <option value=""></option>
                                <option value={true}>Active</option>
                                <option value={false}>Inactive</option>
                            </select>
                    </div>
                </div>
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
            </div>
        );
    }
}

export default CampaignsList;