import React from 'react';

const CustomInput = (props) => {
    const { type, i_class, i_id, label, name, val, onCh, onBl } = props;
    return (
        <div className="form-floating mt-3">
            <input
                type={type}
                name={name}
                value={val}
                className={`form-control ${i_class}`}
                id={i_id}
                onChange={onCh}
                onBlur={onBl}
                placeholder={label}
            />
            <label htmlFor={i_id}>{label}</label>
        </div>
    );
};

export default CustomInput;
