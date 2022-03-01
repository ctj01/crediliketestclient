import { TextField } from '@mui/material';
import { getIn, useFormikContext } from "formik";
import React from "react";
import { Field, Form } from "../textFields/textField";

interface Props {
  field: Field;
  form: Form;
  label: string;
  option: Array<any>;
}

const SelectComponent = ({ field, form, label, option } : Props) => {
  const { errors, touched } = form;
  const errorMessage = getIn(errors, field.name);
  const error = errorMessage?.substring(errorMessage?.indexOf(".") + 1);
  const { setFieldValue } = useFormikContext();
  const touch = getIn(touched, field?.name);
  return (
    <>
      <TextField
        {...field}
        error={Boolean(errorMessage && touch)}
        label={label}
        defaultValue={label}
        helperText={error}
        value={field.value}
        select
        fullWidth
        
      >
        {option}
      </TextField>
    </>
  );
};

export default SelectComponent;
