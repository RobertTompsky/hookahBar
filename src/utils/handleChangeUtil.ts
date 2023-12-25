import { Dispatch, SetStateAction } from 'react';

interface InputEvent extends EventTarget {
  name: string;
  value: string;
}

export const handleChange = <T>(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  state: T,
  setState: Dispatch<SetStateAction<T>>
) => {
  const { name, value } = e.target as InputEvent;
  const strOrNumValue: string | number = isNaN(Number(value)) ? value : Number(value);
  setState({
    ...state,
    [name]: strOrNumValue,
  });
};