import React from "react";

const FormItem = ({ label, value, onChange, placeholder, type = "text" }) => {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input
                type={type}
                className="form-control"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
            />
        </div>
    );
};

export default FormItem;