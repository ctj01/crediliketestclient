import { Button, Grid, InputAdornment, MenuItem } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { covidVaccine, gender, identificationTypes } from '../../constants/constantData'
import { validDateSelected } from '../../utils/validateDate'
import DatePickerMui from '../datePickerComponent/datePickerMui'
import NumberFormatMoney from '../numberFormat/numberFormat'
import SelectComponent from '../selectComponent/selectMui'
import SwitchMui from '../switchComponent/switchMui'
import TextFieldComponent from '../textFields/textField'
interface IRegisterUserProps {
  submitFunction: Function
}
const RegisterUser = ({submitFunction} : IRegisterUserProps) => {
  const initialValues = {
    id: 0,
    name: '',
    identificationType: '',
    identificationNumber: '',
    gender: '',
    dateOfBirth: new Date(),
    salary: 0,
    covidVaccine: false,
    clientId: 0
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('el nombre es requerido'),
    identificationType: Yup.string().required(
      'el tipo de identificación es requerido',
    ),
    identificationNumber: Yup.string().required(
      'el número de identificación es requerido',
    ),
    gender: Yup.string().required('El genero es requerido'),
    dateOfBirth: Yup.date().max(validDateSelected(18), 'Debes ser mayor a 18 años').required('La fecha de nacimiento es requerida'),
    salary: Yup.string().required('El salario es requerido'),
    covidVaccine: Yup.boolean().required('La vacuna es requerida'),
  })
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => submitFunction(values)}
    >
      {({ handleSubmit }) => (
        <Form>
          <Grid container spacing={3} padding={3}>
            <Grid item xs={12} md={6}>
              <Field
                name="name"
                label="Nombre"
                component={TextFieldComponent}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                name="identificationType"
                label="Tipo de identificación"
                component={SelectComponent}
                option={identificationTypes.map((value, index) => (
                  <MenuItem
                    key={`identification-type-${index}`}
                    value={value.value}
                  >
                    {value.label}
                  </MenuItem>
                ))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                name="identificationNumber"
                label="Número de identificación"
                component={TextFieldComponent}
                isDocument={true}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field name="gender" label="Genero" component={SelectComponent} option={gender.map((value, index) => (
                  <MenuItem
                  key={`gender-type-${index}`}
                  value={value.value}
                >
                  {value.label}
                </MenuItem>
              ))}/>
            </Grid>
            <Grid item xs={12} md={6} > 
                <Field
                  name="dateOfBirth"
                  label="Fecha de nacimiento"
                  component={DatePickerMui}
                />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                name="salary"
                label="Salario"
                component={TextFieldComponent}
                InputProps={
                   {
                    inputComponent: NumberFormatMoney,
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    )
                  }
                }
                isMoney={true}
              />
              </Grid>
                <Grid item xs={12} md={6}>
                <Field
                  name="covidVaccine"
                  label="Vacuna"
                  component={SwitchMui}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                <Button color='primary' variant='contained' onClick={() => handleSubmit()}>
                  Registrar
                </Button>
                </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default RegisterUser
