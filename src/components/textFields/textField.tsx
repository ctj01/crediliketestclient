import { TextField } from '@mui/material';
import { getIn } from 'formik';
import React  from 'react';
import numberWithCommas from '../../utils/moneyFormat';
import noZero from '../../utils/noZero';
import onlyNums from '../../utils/onlyNums';

export interface Field {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}
export interface Form {
    values: {
        [key: string]: string;
    };
    errors: {
        [key: string]: string;
    };
    touched: {
        [key: string]: string;
    };
}
interface Props {
    field: Field;
    form: Form;
    label: string;
    placeholder: string;
    InputLabelProps?: any;
    InputProps?: any;
    inputProps?: any;
    disabled?: boolean;
    isDocument?: boolean;
    isMoney?: boolean;
}
 const getValue = (value: string | number, type = 'default') => {
    const result = {
      document: noZero(onlyNums(value)),
      default: value
    } as any;
    return result[type];
  };
const TextFieldComponent = ({
    field,
    form,
    label,
    placeholder,
    InputLabelProps,
    InputProps,
    inputProps,
    disabled,
    isDocument=false,
    isMoney = false,
  } : Props) => {
    const { errors, touched } = form;
    const errorMessage = getIn(errors, field.name);
    const error = errorMessage?.substring(errorMessage.indexOf(".") + 1);
    const touch = getIn(touched, field.name);
    return (
        <TextField
          {...field}
          InputProps={InputProps}
          inputProps={inputProps}
          InputLabelProps={InputLabelProps}
          error={Boolean(errorMessage && touch)}
          label={label}
          placeholder={placeholder}
          disabled={disabled}
          value={getValue(field.value, isDocument ? 'document' : 'default')}
          helperText={error}
          fullWidth
        />
    );
  };
  
 
  export default TextFieldComponent;