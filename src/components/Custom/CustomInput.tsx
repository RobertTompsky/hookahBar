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
        className={`px-2 py-1 bg-zinc-50 rounded-md ${customStyles}`}
        onChange={onChange}
        placeholder={placeholder}
        />
    );
};

export default CustomInput;