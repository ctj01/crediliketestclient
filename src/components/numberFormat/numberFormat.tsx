import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import React from 'react';
interface Props {
    inputRef?: (instance: any | null) => void;
    onChange: (event: {
        target: {
            value: string;
            name: string;
        };
    }) => void;
    placeholder?: string;
    name: any;
    value: any
}
function NumberFormatMoney(props : Props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange( {
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      allowNegative={false}
      fixedDecimalScale
      decimalScale={0}
      {...other}
    />
  );
}
export default NumberFormatMoney;