import React from 'react';
import classes from './Select.module.scss'

const Select = ({options, defaultValue, defaultName, value, onChange}) => {
    return (
        <select 
            className={classes.Select}
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option value={defaultValue}>{defaultName}</option>
            {options.map(option => 
                option.value !== defaultValue &&
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
            )}
        </select>
    );
};

export default Select;