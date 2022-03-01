import {
  Button,
  Dialog,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useSnackbar, VariantType } from 'notistack'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import {
  covidVaccine,
  gender,
  identificationTypes,
} from '../../constants/constantData'
import { saveUsers } from '../../state/actions/userActions'
import { validDateSelected } from '../../utils/validateDate'
import DatePickerMui from '../datePickerComponent/datePickerMui'
import NumberFormatMoney from '../numberFormat/numberFormat'
import SelectComponent from '../selectComponent/selectMui'
import SwitchMui from '../switchComponent/switchMui'
import TextFieldComponent from '../textFields/textField'
import { IUser } from './../../constants/constantData'
interface IRegisterUserProps {
  user: IUser
  open: boolean
  handleClose: any
}
const EditUser = ({ user, open, handleClose }: IRegisterUserProps) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  function openInformation(data: string, type: VariantType) {
    enqueueSnackbar(data, {
      variant: type,
    })
  }
 
  const AddUsers = async (users : Array<IUser>) => {
    const response: any = await dispatch(saveUsers(users))
    if (response.status === 200)
      openInformation('Empleados guardados', 'success')
    else openInformation('Error al guardar empleados', 'error')
    
    handleClose();
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
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogContent sx={{ marginBottom: '20px' }}>
        <Paper>
          <Formik
            initialValues={user}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              AddUsers([values]);
            }}
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
                    <Field
                      name="gender"
                      label="Genero"
                      component={SelectComponent}
                      option={gender.map((value, index) => (
                        <MenuItem
                          key={`gender-type-${index}`}
                          value={value.value}
                        >
                          {value.label}
                        </MenuItem>
                      ))}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
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
                      InputProps={{
                        inputComponent: NumberFormatMoney,
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
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
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => handleSubmit()}
                    >
                      Guardar
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={ () => handleClose()} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditUser
