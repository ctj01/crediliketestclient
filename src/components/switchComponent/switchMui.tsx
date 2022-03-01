import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Switch,
} from '@mui/material'
import { getIn } from 'formik'
import React from 'react'
import { Form } from '../textFields/textField'
interface IField {
  name: string
  value: boolean
  onChange: (e: React.SyntheticEvent) => void
  onBlur: (e: React.FocusEvent<HTMLLabelElement>) => void
}
interface Props {
  field: IField
  form: Form
  label: string
  option: Array<any>
}
const SwitchMui = ({ field, form, label, option }: Props) => {
  const { errors, touched } = form
  const errorMessage = getIn(errors, field.name)
  const error = errorMessage?.substring(errorMessage?.indexOf('.') + 1)
  const touch = getIn(touched, field?.name)
  return (
    <FormControl component="fieldset" error={Boolean(errorMessage && touch)}>
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup aria-label="position" row>
        <FormControlLabel
          {...field}
          control={<Switch color="primary"  checked={field.value}/>}
          label={field.value ? 'Si' : 'No'}
        />
      </FormGroup>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  )
}

export default SwitchMui
