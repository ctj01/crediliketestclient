import { Button, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IUser, IUserState } from '../../constants/constantData'
import { saveUsers } from '../../state/actions/userActions'
import  NumberFormat  from 'react-number-format';
import { useSnackbar, VariantType } from 'notistack'

const SaveInformation = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  function openInformation(data: string, type: VariantType) {
    enqueueSnackbar(data, {
      variant: type,
    });
  }
  const users: Array<IUser> = useSelector<IUserState, Array<IUser>>(
    (state) => state.users.users,
  )
  const AddUsers = async () => {
    const response: any =  await dispatch(saveUsers(users))
    if(response.status === 200)
      openInformation('Usuarios guardados', 'success')
    else 
      openInformation('Error al guardar usuarios', 'error')
  }
  const computingSalary = () : number => {
    
    const total = users.reduce((acc, user) => {
      return acc + user.salary
    }, 0)
    return total
  }
  return (
    <Box display="flex" width="100%" marginTop={2}>
      <Box display="flex" flexDirection="column" width="100%" marginTop={2}>
        <Grid item xs={3}>
            <Box display="flex" flexDirection="row" justifyContent="space-evenly">
          <Typography variant='button'>{"Total de empleados: "}</Typography>
          <strong>{users.length}</strong>
          </Box>
        </Grid>
        <Grid item xs={3}>
        <Box display="flex" flexDirection="row" justifyContent="space-evenly">
          <Typography variant='button'>
            Total salarios:
          </Typography>
          <strong>{<NumberFormat  value={computingSalary()} thousandSeparator displayType='text' prefix='$' />}</strong>
          </Box>
        </Grid>
      </Box>
      <Grid item xs={3} sx={{marginTop: 3}}>
        <Button variant="contained" color="primary" type='submit' onClick={() => AddUsers() }>
          Guardar registros
        </Button>
      </Grid>
    </Box>
  )
}

export default SaveInformation
