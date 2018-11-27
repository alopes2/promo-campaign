import React from 'react';
import './Input.scss';
const input = (props) => {
    let inputElement = null;

    const inputClasses = ['form-control'];

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('has-error')
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value}
                                onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea 
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value}
                                onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = (
                <select 
                    className={inputClasses.join(' ')} 
                    {...props.elementConfig} 
                    value={props.value}
                    onChange={props.changed}>
                        {props.elementConfig.options.map(op => (
                            <option key={op.id} value={op.id}>{op.name}</option>
                        ))}
                    </select>
            );
            break;
        default:
            inputElement = <input 
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value}
                                onChange={props.changed}/>;
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className="invalid-feedback">{props.errorMessage}</p>;
    }

    return (
        <div className="form-group">
            <label>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
};

export default input;