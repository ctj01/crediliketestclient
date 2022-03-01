import {
  Button,
  Grid,
  Box,
  Dialog,
  Paper,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import TextFieldComponent from './../textFields/textField'
import { Search as SearchIcon, Plus } from 'react-feather'
import RegisterUser from '../registerUser/registerUser'
import { useDispatch, useSelector } from 'react-redux'
import {
  getUsers,
  searchUser,
  setUsers,
} from './../../state/actions/userActions'
import { IUser, IUserState } from '../../constants/constantData'
import { useSnackbar, VariantType } from 'notistack'
const Search = () => {
  const { enqueueSnackbar } = useSnackbar()
  function openInformation(data: string, type: VariantType) {
    enqueueSnackbar(data, {
      variant: type,
    })
  }
  const [open, setOpen] = React.useState(false)
  const dispatch = useDispatch()
  const users: Array<IUser> = useSelector<IUserState, Array<IUser>>(
    (state) => state.users.users,
  )
  const addUser = (user: IUser) => {
    dispatch(setUsers([...users, user]))
    handleClose()
    openInformation('Usuario registrado', 'success')
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const initialValues = {
    predicate: '',
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        values.predicate !== ''
          ? dispatch(searchUser(values.predicate, 1))
          : dispatch(getUsers())
      }}
    >
      {({ handleSubmit }) => (
        <Form>
          <Box display="flex" justifyContent="space-evenly" width="100%">
            <Grid item xs={8}>
              <Field
                name="predicate"
                label="Buscar empleado por nombre o cedula"
                component={TextFieldComponent}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmit()}
                startIcon={<SearchIcon />}
              >
                Buscar
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Plus />}
                onClick={() => handleOpen()}
              >
                Nuevo Empleado
              </Button>
            </Grid>
          </Box>
          <Dialog open={open} onClose={handleClose} maxWidth="md">
            <DialogContent sx={{ marginBottom: '20px' }}>
              <Paper>
                <RegisterUser submitFunction={addUser} />
              </Paper>
            </DialogContent>
          </Dialog>
        </Form>
      )}
    </Formik>
  )
}

export default Search
