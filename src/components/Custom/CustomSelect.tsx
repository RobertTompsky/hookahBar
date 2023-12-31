import React from 'react';

interface CustomSelectProps {
  name: string;
  value: string | number;
  options: { value: string | number; title: string | number }[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  customStyles?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ name, value, options, onChange, customStyles }) => (
  <select className={`select select-sm ${customStyles}`} name={name} value={value} onChange={onChange}>
    {options.map((option, index?) => (
      <option key={index} value={option.value}>
        {option.title}
      </option>
    ))}
  </select>
);

export default CustomSelect;