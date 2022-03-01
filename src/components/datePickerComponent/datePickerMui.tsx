import { DatePicker, LocalizationProvider } from '@mui/lab'
import DateFnsUtils from '@date-io/date-fns'
import { TextField } from '@mui/material'
import { Field, Form } from '../textFields/textField'
import { getIn, useFormikContext } from 'formik'
interface Props {
  field: Field
  form: Form
  label: string
  InputLabelProps?: any
}
const DatePickerMui = ({ field, form, label, InputLabelProps }: Props) => {
  const { setFieldValue } = useFormikContext()
  const { errors, touched } = form
  const errorMessage = getIn(errors, field.name)
  const error = errorMessage?.substring(errorMessage.indexOf('.') + 1)
  const touch = getIn(touched, field.name)
  return (
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <DatePicker<any>
        {...field}
        label={label}
        openTo="year"
        disableFuture
        onChange={(date) => {
          setFieldValue(field.name, date)
        }}
        views={['day', 'month', 'year']}
        /* minDate={validDateSelected()}
      initialFocusedDate={validDateSelected()} */
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            error={Boolean(errorMessage && touch)}
            helperText={error}
            InputLabelProps={InputLabelProps}
          />
        )}
      />
    </LocalizationProvider>
  )
}

export default DatePickerMui
