import React, { Component } from 'react';
import axios from 'axios';

class NewCampaign extends Component {
    state = {
        products: [],
        campaign: {
            name: 'New Test',
            productId: 1,
            start: new Date('')
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
            console.log(response);
        } catch (e) {
            console.error(e);
        }
    }

    discardChangesHandler = async (event) => {
        event.preventDefault();
        this.props.history.push('/campaigns');
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleAddNewCampaign}>
                    <div className="form-control">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="product">Product</label>
                        <select name="product" id="product">
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
                    <div className="form-control">
                        <label htmlFor="start">Start</label>
                        <input type="date" name="start" id="start" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="end">End</label>
                        <input type="date" name="end" id="end" />
                    </div>
                    <button onClick={this.discardChangesHandler} type="button">discard changes</button>
                    <button type="submit">add new campaign</button>
                </form>
            </div>
        );
    }
}

export default NewCampaign;