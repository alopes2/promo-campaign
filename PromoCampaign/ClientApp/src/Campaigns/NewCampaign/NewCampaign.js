import React, { Component } from 'react';
import axios from 'axios';
import { DateRangePicker } from 'react-dates';

class NewCampaign extends Component {
    state = {
        products: [],
        campaign: {
            name: '',
            productId: 1,
            start: null,
            end: null
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
            const errorResponse = `${e.response.statusText}: ${e.response.data}`;
            alert(errorResponse);
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

    setDates = (updatedDates) => {
        const updatedCampaign = {
            ...this.state.campaign,
            start: updatedDates.startDate,
            end: updatedDates.endDate
        };

        this.setState({ campaign: updatedCampaign });
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
                        <label>Select start and end date</label>
                        <br/>
                        <DateRangePicker
                        startDate={this.state.campaign.start} // momentPropTypes.momentObj or null,
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        endDate={this.state.campaign.end} // momentPropTypes.momentObj or null,
                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                        onDatesChange={(updateDates) => this.setDates(updateDates)} // PropTypes.func.isRequired,
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                        />
                    </div>
                    {/* <div className="form-group">
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
                    </div> */}
                    <button className="btn btn-warning" onClick={this.discardChangesHandler} type="button">discard changes</button>
                    <button className="btn btn-info" type="submit">add new campaign</button>
                </form>
            </div>
        );
    }
}

export default NewCampaign;