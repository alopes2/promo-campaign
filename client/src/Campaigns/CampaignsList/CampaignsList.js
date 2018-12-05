import React, { Component } from 'react';
import axios from 'axios';
import environment from '../../shared/environment';
import {toQueryString} from '../../shared/utility';
import './CampaignsList.scss';
import Pagination from '../../shared/Pagination/Pagination';
class CampaignsList extends Component {
    state = {
        totalItems: 0,
        campaigns: [],
        filter: {
            isActive: null,
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
            const query = this.state.filter;
            const response = await axios.get(`${environment.BASE_URL}Campaigns?${toQueryString(query)}`);
            this.setState({
                campaigns: response.data.items,
                totalItems: response.data.totalItems
            });
        }catch (e) {
            let text = e;
            if (e.response) {
                text = `${e.response.statusText}: ${e.response.data}`;
            }
            const errorResponse = text;
            alert(errorResponse);
        }
    }

    componentDidMount() {
        this.fetchCampaigns();
    }

    handleFilterChange = (event) => {
        const updatedFilter = {
            ...this.state.filter,
            isActive: event.target.value,
            page: 1
        };
        this.setState({filter: updatedFilter}, () => {
            this.fetchCampaigns();
        });
    }

    handlePageChange = (page) => {
        const updatedFilter = {
            ...this.state.filter,
            page: page
        };
        this.setState({filter: updatedFilter}, () => {
            this.fetchCampaigns();
        });
    }

    handleSortBy = (column) => {
        let ascending = this.state.filter.ascending;

        if (this.state.filter.sortBy === column) {
            ascending = !ascending;
        } else {
            ascending = true;
        }
        const updatedFilter = {
            ...this.state.filter,
            sortBy: column,
            ascending: ascending
        };

        this.setState({filter: updatedFilter}, () => {
            this.fetchCampaigns();
        });
    }

    formatDate(stringDate) {
        if(stringDate) {
            const date = new Date(stringDate);
            return `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;
        }
        return '';
    }

    
    buildTableList() {
        let list = (<tr>
            <td colSpan="4">No campaigns available :(</td>
        </tr>);
        if (this.state.totalItems > 0) {
            list = this.state.campaigns
                .map(c => (<tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.product.name}</td>
                    <td>{this.formatDate(c.start)}</td>
                    <td>{this.formatDate(c.end)}</td>
                    <td>{this.formatDate(c.createdAt)}</td>
                </tr>));
        }
        return list;
    }

    buildTableHeaders() {
        return this.state.columns
            .map(col => {
                let arrow = null;
                if (this.state.filter.sortBy === col.key) {
                    let orderClasses = this.state.filter.ascending
                        ? ["fa", "fa-sort-asc"]
                        : ["fa", "fa-sort-desc"];
                    arrow = (<i className={orderClasses.join(' ')}></i>);
                }
                return (<th key={col.key} style={{
                    cursor: 'pointer'
                }}>
                    <div onClick={() => this.handleSortBy(col.key)}>
                        {col.title}
                        {arrow}
                    </div>
                </th>);
            });
    }

    render() {
        let list = this.buildTableList();

        let columnHeaders = this.buildTableHeaders();
        return (
            <div>
                <h1>Campaigns List</h1>
                <div className="well">
                        <div className="form-group">
                            <label htmlFor="active">Active status</label>
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
                <Pagination 
                    currentPage={this.state.filter.page}
                    totalItems={this.state.totalItems} 
                    pageSize={this.state.filter.pageSize}
                    onChangePage={(page) => this.handlePageChange(page)} />
            </div>
        );
    }

}

export default CampaignsList;