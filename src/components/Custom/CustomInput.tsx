import React from 'react';

interface CustomInputProps {
    name?: string,
    value: string | number,
    customStyles: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>
    placeholder?: string,

}
const CustomInput = ({name, value, customStyles, onChange, placeholder}: CustomInputProps) => {
    return (
        <input 
        name={name}
        value={value}
        className={`input input-sm ${customStyles}`}
        onChange={onChange}
        placeholder={placeholder}
        />
    );
};

export default CustomInput;