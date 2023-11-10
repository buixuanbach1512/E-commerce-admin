import React from 'react';

const CustomInput = (props) => {
    const { type, i_class, i_id, label, name, val, onCh } = props;
    return (
        <div className="form-floating mt-3">
            <input
                type={type}
                name={name}
                value={val}
                className={`form-control ${i_class}`}
                id={i_id}
                onChange={onCh}
                onBlur={onCh}
                placeholder={label}
            />
            <label htmlFor={label}>{label}</label>
        </div>
    );
};

export default CustomInput;
