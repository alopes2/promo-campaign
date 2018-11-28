import React, { Component } from 'react';
import axios from 'axios';

import environment from '../../shared/environment';
import { DateRangePicker } from 'react-dates';
import { checkValidity, updateObject} from '../../shared/utility';
import Input from '../../shared/Input/Input';

class NewCampaign extends Component {
    state = {
        products: [],
        campaignForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Campaign Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            productId: {
                elementType: 'select',
                elementConfig: {
                    options: []
                },
                value: 1,
                validation: {},
                valid: true
            },
            start: {
                value: null,
                validation: {
                    required: true
                },
                valid: false
            },
            end: {
                value: null,
                validation: {
                    required: true
                },
                valid: false
            }
        },
        formIsValid: false
    };

    async componentDidMount() {
        try {
            const response = await axios.get(`${environment.BASE_URL}Products`);
            const productId = {
                ...this.state.campaignForm.productId
            };

            const updatedProductId = {
                ...productId,
                elementConfig: {
                    ...productId.elementConfig,
                    options: response.data
                }
            };

            const updatedCampaignForm = {
                ...this.state.campaignForm,
                productId: updatedProductId
            };

            this.setState({
                campaignForm: updatedCampaignForm
            });
        } catch (e) {
            console.error(e);
        }
    }

    handleAddNewCampaign = async (event) => {
        event.preventDefault();
        if (this.state.formIsValid) {
            const formData = {};
            for (let formElement in this.state.campaignForm) {
                formData[formElement] = this.state.campaignForm[formElement].value;
            }
            try {
                const data = this.state.campaignForm;
                const response = await axios.post(`${environment.BASE_URL}Campaigns`, formData);
                this.props.history.push('..')
            } catch(e) {
                let text = e;
                if (e.response) {
                    text = `${e.response.statusText}: ${e.response.data}`;
                }
                const errorResponse = text;
                alert(errorResponse);
            }
            
        } else {
            alert('Please, fill all fields')
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {

        const updatedFormElement = updateObject(this.state.campaignForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.campaignForm[inputIdentifier].validation),
            touched: true
        });

        
        const updatedCampaignForm = updateObject(this.state.campaignForm,{
            [inputIdentifier]: updatedFormElement
        });


        let formIsValid = true;
        for(let input in updatedCampaignForm) {
            formIsValid = updatedCampaignForm[input].valid && formIsValid;
        }
        
        this.setState({campaignForm: updatedCampaignForm, formIsValid: formIsValid});
    }

    discardChangesHandler = async (event) => {
        event.preventDefault();
        this.props.history.push('/campaigns');
    }

    setDates = (updatedDates) => {

        const updatedStart = updateObject(this.state.campaignForm['start'], {
            value: updatedDates.startDate,
            valid: updatedDates.startDate !== null,
            touched: true
        });

        const udpateEnd = updateObject(this.state.campaignForm['end'], {
            value: updatedDates.endDate,
            valid: updatedDates.endDate !== null,
            touched: true
        });
        
        const updatedCampaignForm = updateObject(this.state.campaignForm,{
            start: updatedStart,
            end: udpateEnd
        });
        
        let formIsValid = true;
        for(let input in updatedCampaignForm) {
            formIsValid = updatedCampaignForm[input].valid && formIsValid;
        }
            
        this.setState({campaignForm: updatedCampaignForm, formIsValid: formIsValid});
    }

    render() {
        
        const formElements = [];

        for (let key in this.state.campaignForm) {
            formElements.push({
                id: key,
                config: this.state.campaignForm[key]
            });
        }
        return (
            <div>
                <h1>Add new campaign</h1>
                <form onSubmit={this.handleAddNewCampaign}>
                    
                    {formElements.filter(formElement => formElement.config.elementConfig !== undefined).map(formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            errorMessage={'Please, enter a valid ' + formElement.id}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                    ))}
                    <div className="form-group">
                        <label>Select start and end date</label>
                        <br/>
                        <DateRangePicker
                        startDate={this.state.campaignForm.start.value} 
                        startDateId="your_unique_start_date_id" 
                        endDate={this.state.campaignForm.end.value} 
                        endDateId="your_unique_end_date_id" 
                        onDatesChange={(updateDates) => this.setDates(updateDates)} 
                        focusedInput={this.state.focusedInput} 
                        onFocusChange={focusedInput => this.setState({ focusedInput })} 
                        />
                    </div>
                    <button className="btn btn-warning" onClick={this.discardChangesHandler} type="button">discard changes</button>
                    <button className="btn btn-info" type="submit">add new campaign</button>
                </form>
            </div>
        );
    }
}

export default NewCampaign;