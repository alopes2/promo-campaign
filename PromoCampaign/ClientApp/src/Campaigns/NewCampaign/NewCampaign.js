import React, { Component } from 'react';
import axios from 'axios';

class NewCampaign extends Component {
    state = {
        products: [],
        campaign: {
            name: '',
            productId: 1,
            start: '',
            end: ''
        }
    };

    async componentDidMount() {
        try {
            const response = await axios.get('/api/Products');
            this.setState({products: response.data});
        } catch (e) {
            console.error(e);
        }
    }

    handleAddNewCampaign = async (event) => {
        event.preventDefault();
        
        try {
            const data = this.state.campaign;
            const response = await axios.post('/api/Campaigns', data);
            this.props.history.push('..')
        } catch (e) {
            console.error(e);
        }
    }

    handleInputChange = (event, element) => {
        const campaign = {
            ...this.state.campaign,
            [element]: event.target.value
        };
        this.setState({
            campaign: campaign
        });
    }

    discardChangesHandler = async (event) => {
        event.preventDefault();
        this.props.history.push('/campaigns');
    }

    render() {
        return (
            <div>
                <h1>Add new campaign</h1>
                <form onSubmit={this.handleAddNewCampaign}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input 
                            onChange={(event) => this.handleInputChange(event, "name")}
                            className="form-control" 
                            type="text" name="name" id="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select 
                            onChange={(event) => this.handleInputChange(event, "productId")}
                            className="form-control" name="product" id="product">
                            {
                                this.state.products
                                    .map(p => (
                                        <option 
                                            key={p.id}
                                            value={p.id}>{p.name}</option>
                                    ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="start">Start</label>
                        <input 
                            onChange={(event) => this.handleInputChange(event, "start")}
                            className="form-control" type="date" name="start" id="start" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="end">End</label>
                        <input 
                            onChange={(event) => this.handleInputChange(event, "end")}
                            className="form-control" type="date" name="end" id="end" />
                    </div>
                    <button className="btn btn-warning" onClick={this.discardChangesHandler} type="button">discard changes</button>
                    <button className="btn btn-info" type="submit">add new campaign</button>
                </form>
            </div>
        );
    }
}

export default NewCampaign;